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
  const stripe = new Stripe(
    'sk_test_51N0G96FlNzy8IbvjVvC8cbIxAZdbY3VMOnOw8ceJKboLcrf5oVlEpbGP68Tr5T6odLkpsp60NS0ngii1A9GjPG9J00gvP6RMTe',
    {
      apiVersion: '2022-11-15',
    }
  );

  try {
    let itemPrice = data.total;
    let storeName = 'Upper West Side Deli | BNE';
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
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
      success_url: 'http://upperwestsidedeli.web.app/check-out',
      cancel_url: 'http://upperwestsidedeli.web.app/cancel',
    });
    const result = await session;
    return result.id;
  } catch (error) {
    console.log(error);
  }
});
