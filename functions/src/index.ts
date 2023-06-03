import { getAuth } from '@angular/fire/auth';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

// const serviceAccount = require('./../service_account/upperwestsidedeli-firebase-adminsdk-oj019-988f1a4df8');
// admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

admin.initializeApp(functions.config().firebase);
const stripe = new Stripe(
  'sk_test_51N0G96FlNzy8IbvjVvC8cbIxAZdbY3VMOnOw8ceJKboLcrf5oVlEpbGP68Tr5T6odLkpsp60NS0ngii1A9GjPG9J00gvP6RMTe',
  {
    apiVersion: '2022-11-15',
  }
);

//stripe cloud functions
exports.stripeCheckout = functions.https.onCall(async (data, context) => {
  let db = admin.firestore();
  let orderID = data as string;

  let order = await db
    .collection('orders')
    .where('id', '==', `${orderID}`)
    .get();

  if (!order.empty) {
    let docSnap = order.docs[0];
    try {
      let itemPrice = docSnap.data().total;
      let storeName = 'Upper West Side Deli | BNE';
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        client_reference_id: orderID,
        line_items: [
          {
            quantity: 1,
            price_data: {
              product_data: {
                name: storeName,
              },
              currency: 'aud',
              unit_amount: itemPrice * 100,
            },
          },
        ],
        mode: 'payment',
        success_url: 'http://upperwestsidedeli.web.app/success',
        cancel_url: 'http://upperwestsidedeli.web.app/cancel',
      });
      const result = session.id;
      return result;
    } catch (error) {
      console.log(error);
    }
  } else {
    console.log('No such document!!!');
  }
});

exports.stripeWebhook = functions.https.onRequest(async (request, response) => {
  const stripeSignature = request.headers['stripe-signature'] as string;
  const webhookSecret = 'whsec_HGz854wro4AnX60W5kpWIsE0h94dTlIE';
  let event;
  try {
    // Verify the event using the Stripe secret key
    event = stripe.webhooks.constructEvent(
      request.rawBody,
      stripeSignature,
      webhookSecret
    );
    response.sendStatus(200);
  } catch (error) {
    console.error('Webhook error:', error);
    response.sendStatus(500);
  }

  if (event?.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    // Process the completed checkout session
    // Extract relevant data from the session object
    const { id, payment_status, amount_total, created, client_reference_id } =
      session;

    //retrieving line items from the session
    const retrieveSession = stripe.checkout.sessions.listLineItems(id);
    const lineItems = (await retrieveSession).data.map((element) => {
      element.id;
    });

    // Create a new document in Firestore
    const docRef = await admin
      .firestore()
      .collection('orders')
      .doc(String(client_reference_id))
      .update({
        checkoutSessionId: id,
        paymentStatus: payment_status,
        amountTotal: amount_total,
        paidAt: created,
      });
    console.log('Order created with ID:', docRef);
  }
});

admin
  .auth()
  .getUserByEmail('dhirajkc031@gmail.com')
  .then((user) => {
    if (user.emailVerified) {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true,
      });
    }
  })
  .catch((err) => {
    console.log(err);
  });
