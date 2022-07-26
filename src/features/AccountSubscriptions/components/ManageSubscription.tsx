import { getCreditCardIcon } from 'components/Payments/utils';
import { Subscription } from '../types';
export interface ManageSubscriptionProps {
  subscription: Subscription;
}

export const ManageSubscription = ({ subscription }: ManageSubscriptionProps) => {
  const product = subscription.products[0];
  const CreditCardIcon = getCreditCardIcon(subscription.paymentMethod.instrument.brand);

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-6">
        <div>
          <h3 className="text-lg leading-6 font-medium text-gray-900">Manage subscription</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Make changes to your deliveries, payments and more.</p>
        </div>

        <div className="flex flex-shrink-0 mt-6 space-x-4 lg:mt-0">
          <button
            type="button"
            className="self-start py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-200 text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full"
          >
            Skip Next Delivery
          </button>

          <button
            type="button"
            className="self-start py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium bg-gray-200 text-gray-900 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-full"
          >
            Order Now
          </button>
        </div>
      </div>

      <div className="mt-6 sm:mt-8 border-t border-gray-200">
        <dl className="divide-y divide-gray-200">
          {/* Date started */}
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Date started</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex-grow">
                <time dateTime={subscription.createdDatetime}>{subscription.createdDate}</time>
              </div>
            </dd>
          </div>

          {/* Next charge */}
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Next charge date</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex-grow">{subscription.nextChargeDate}</div>
              <div className="ml-4 flex-shrink-0 flex space-x-4">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </dd>
          </div>

          {/* Delivery schedul */}
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Delivery schedule</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex-grow">{subscription.frequency}</div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </dd>
          </div>

          {/* Product */}
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Product</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex-grow">
                <div>{product.name}</div>
                <div className="mt-2">{product.variant}</div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </dd>
          </div>

          {/* Quantity */}
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Quantity</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex-grow">
                <div className="mt-2">{product.quantity}</div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </dd>
          </div>

          {/* Amount */}
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Amount per item</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex-grow">{product.price}</div>
            </dd>
          </div>

          {/* Amount */}
          <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Total Amount</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex-grow">{subscription.total}</div>
            </dd>
          </div>

          {/* Shipping address */}
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Shipping address</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span className="flex-grow">
                <span className="block">{subscription.shippingAddress.name}</span>
                <span className="block mt-1">{subscription.shippingAddress.line1}</span>
                <span className="block mt-1">{subscription.shippingAddress.line2}</span>
                <span className="block mt-1">
                  {subscription.shippingAddress.city}, {subscription.shippingAddress.state}
                </span>
                <span className="block mt-1">{subscription.shippingAddress.zip}</span>
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>

          {/* Payment method */}
          <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
            <dt className="text-sm font-medium text-gray-500">Payment method</dt>
            <dd className="mt-1 flex text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <div className="flex-grow">
                <span className="block">
                  <CreditCardIcon className="h-6 w-6 inline-block" />
                  <span className="inline-block ml-2">{subscription.paymentMethod.instrument.brand}</span>{' '}
                  <span className="inline-block ml-1">{subscription.paymentMethod.instrument.maskedNumber}</span>
                </span>
                <span className="block mt-1">
                  <span className="font-medium text-xs">Expires:</span>{' '}
                  {subscription.paymentMethod.instrument.expiryMonth}/{subscription.paymentMethod.instrument.expiryYear}
                </span>
              </div>
              <div className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
              </div>
            </dd>
          </div>

          {/* Cancel */}
          <div className="flex pt-4 pb-2 sm:pt-6 sm:pb-3">
            <button
              type="button"
              className="ml-auto bg-gray-100 py-2 px-2.5 rounded-md shadow-sm text-sm font-medium text-gray-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel Subscription
            </button>
          </div>
        </dl>
      </div>
    </div>
  );
};
