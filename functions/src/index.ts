import { doc } from 'firebase/firestore';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

//stripe cloud functions
exports.stripeCheckout = functions.https.onCall(async (data, context) => {
  // let uid = data.uid;
  // let db = admin.firestore();
  // let querySnapshot = await db
  //   .collection('orders')
  //   .where('uid', '==', uid)
  //   .get();

  // if (querySnapshot.docs.length > 0) {
  //   let order = querySnapshot.docs[0];
  //   let price = order.data().total;
  // } else console.log('No such data ');

  const stripe = new Stripe(
    'sk_test_51N0G96FlNzy8IbvjVvC8cbIxAZdbY3VMOnOw8ceJKboLcrf5oVlEpbGP68Tr5T6odLkpsp60NS0ngii1A9GjPG9J00gvP6RMTe',
    {
      apiVersion: '2022-11-15',
    }
  );

  try {
    let itemPrice = data.total;
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          quantity: 1,
          price_data: {
            // product_data: {
            //   name: itemName,
            //   description: itemDescritpion,
            // },
            currency: 'usd',
            unit_amount: itemPrice * 100,
          },
        },
      ],
      mode: 'payment',
      success_url: 'http://localhost:4200/success',
      cancel_url: 'http://localhost:4200/cancel',
    });
    const result = await session;
    return result.id;
  } catch (error) {
    console.log(error);
  }
});
