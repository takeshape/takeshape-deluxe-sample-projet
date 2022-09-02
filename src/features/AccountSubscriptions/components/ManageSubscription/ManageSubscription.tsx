import { format, isFuture } from 'date-fns';
import { PaymentMethodRechargeForm } from 'features/AccountSubscriptions/components/Actions/PaymentMethodRechargeForm';
import { useState } from 'react';
import { formatRechargePrice } from 'utils/text';
import { RefetchSubscriptions, Subscription, SubscriptionSelectedVariant } from '../../types';
import { formatDeliverySchedule } from '../../utils';
import { CancelSubscriptionForm } from '../Actions/CancelSubscriptionForm';
import { DeliveryFrequencyForm } from '../Actions/DeliveryFrequencyForm';
import { NextChargeDateForm } from '../Actions/NextChargeDate';
import { OrderNowForm } from '../Actions/OrderNowForm';
import { ProductOptionsForm } from '../Actions/ProductOptionsForm';
import { ShippingAddressForm } from '../Actions/ShippingAddress';
import { SkipForm } from '../Actions/SkipForm';

export interface ManageSubscriptionProps {
  subscription: Subscription;
  variant: SubscriptionSelectedVariant;
  refetchSubscriptions: RefetchSubscriptions;
}

export const ManageSubscription = ({ subscription, variant, refetchSubscriptions }: ManageSubscriptionProps) => {
  const nextOrder = subscription.charges
    .filter((charge) => isFuture(new Date(charge.scheduled_at)))
    .find((charge) => charge.status === 'QUEUED');

  const [isNextChargeDateOpen, setIsNextChargeDateOpen] = useState(false);
  const [isShippingAddressOpen, setIsShippingAddressOpen] = useState(false);
  const [isProductOptionsOpen, setIsProductOptionsOpen] = useState(false);
  const [isDeliveryScheduleOpen, setIsDeliveryScheduleOpen] = useState(false);
  const [isSkipNextOpen, setIsSkipNextOpen] = useState(false);
  const [isOrderNowOpen, setIsOrderNowOpen] = useState(false);
  const [isCancelSubscriptionOpen, setIsCancelSubscriptionOpen] = useState(false);
  const [isPaymentMethodOpen, setIsPaymentMethodOpen] = useState(false);

  return (
    <>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-6">
          <div>
            <h3 className="text-lg leading-6 font-medium text-body-900">Manage subscription</h3>
            <p className="mt-1 max-w-2xl text-sm text-body-500">Make changes to your deliveries, payments and more.</p>
          </div>

          <div className="flex flex-shrink-0 mt-6 space-x-4 lg:mt-0">
            {nextOrder && (
              <button
                type="button"
                onClick={() => setIsSkipNextOpen(true)}
                className="self-start py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium bg-body-200 text-body-900 hover:bg-body-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 sm:w-full"
              >
                Skip Next Order
              </button>
            )}

            {nextOrder && (
              <button
                type="button"
                onClick={() => setIsOrderNowOpen(true)}
                className="self-start py-2 px-2.5 border border-transparent rounded-md shadow-sm text-sm font-medium bg-body-200 text-body-900 hover:bg-body-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500 sm:w-full"
              >
                Order Now
              </button>
            )}
          </div>
        </div>

        <div className="mt-6 sm:mt-8 border-t border-body-200">
          <dl className="divide-y divide-body-200">
            {/* Date started */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Date started</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  <time dateTime={subscription.created_at}>{format(new Date(subscription.created_at), 'PPP')}</time>
                </div>
              </dd>
            </div>

            {/* Next charge */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Next charge date</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">{format(new Date(nextOrder.scheduled_at), 'PPP')}</div>
                <div className="ml-4 flex-shrink-0 flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setIsNextChargeDateOpen(true)}
                    className="bg-white rounded-md font-medium text-accent-600 hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Delivery frequency */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Delivery frequency</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">{formatDeliverySchedule(subscription)}</div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsDeliveryScheduleOpen(true)}
                    className="bg-white rounded-md font-medium text-accent-600 hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Product */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Product</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  <div>{variant.product.title}</div>
                  <div className="mt-2">{variant.title}</div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsProductOptionsOpen(true)}
                    className="bg-white rounded-md font-medium text-accent-600 hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Quantity */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Quantity</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  <div className="mt-2">{subscription.quantity}</div>
                </div>
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsProductOptionsOpen(true)}
                    className="bg-white rounded-md font-medium text-accent-600 hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                  >
                    Update
                  </button>
                </div>
              </dd>
            </div>

            {/* Amount */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Amount per item</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  {formatRechargePrice(subscription.presentment_currency, subscription.price / subscription.quantity)}
                </div>
              </dd>
            </div>

            {/* Amount */}
            <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Total Amount</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                <div className="flex-grow">
                  {formatRechargePrice(subscription.presentment_currency, subscription.price)}
                </div>
              </dd>
            </div>

            {/* Shipping address */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Shipping address</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                <span className="flex-grow">
                  <span className="block">
                    {subscription.address.first_name} {subscription.address.last_name}
                  </span>
                  <span className="block mt-1">{subscription.address.address1}</span>
                  <span className="block mt-1">{subscription.address.address2}</span>
                  <span className="block mt-1">
                    {subscription.address.city}, {subscription.address.province}
                  </span>
                  <span className="block mt-1">{subscription.address.zip}</span>
                </span>
                <span className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsShippingAddressOpen(true)}
                    className="bg-white rounded-md font-medium text-accent-600 hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
                  >
                    Update
                  </button>
                </span>
              </dd>
            </div>

            {/* Payment method */}
            <div className="py-4 sm:grid sm:py-5 sm:grid-cols-3 sm:gap-4">
              <dt className="text-sm font-medium text-body-500">Payment method</dt>
              <dd className="mt-1 flex text-sm text-body-900 sm:mt-0 sm:col-span-2">
                {/* <CreditCard className="flex-grow" card={subscription.paymentMethod.instrument} /> */}
                <div className="ml-4 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => setIsPaymentMethodOpen(true)}
                    className="bg-white rounded-md font-medium text-accent-600 hover:text-accent-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
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
                onClick={() => setIsCancelSubscriptionOpen(true)}
                className="ml-auto bg-body-100 py-2 px-2.5 rounded-md shadow-sm text-sm font-medium text-body-600 hover:bg-body-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-500"
              >
                Cancel Subscription
              </button>
            </div>
          </dl>
        </div>
      </div>

      <NextChargeDateForm
        isOpen={isNextChargeDateOpen}
        onClose={() => setIsNextChargeDateOpen(false)}
        subscription={subscription}
        refetchSubscriptions={refetchSubscriptions}
      />

      <ProductOptionsForm
        subscription={subscription}
        variants={variant.product.variants.edges.map((edge) => edge.node)}
        variantOptions={variant.product.options}
        currentSelections={variant.selectedOptions}
        refetchSubscriptions={refetchSubscriptions}
        isOpen={isProductOptionsOpen}
        onClose={() => setIsProductOptionsOpen(false)}
      />

      <DeliveryFrequencyForm
        subscription={subscription}
        refetchSubscriptions={refetchSubscriptions}
        isOpen={isDeliveryScheduleOpen}
        onClose={() => setIsDeliveryScheduleOpen(false)}
      />

      <ShippingAddressForm
        subscription={subscription}
        refetchSubscriptions={refetchSubscriptions}
        isOpen={isShippingAddressOpen}
        onClose={() => setIsShippingAddressOpen(false)}
      />

      <SkipForm
        isOpen={isSkipNextOpen}
        onClose={() => setIsSkipNextOpen(false)}
        subscription={subscription}
        order={nextOrder}
        refetchSubscriptions={refetchSubscriptions}
      />

      <OrderNowForm
        isOpen={isOrderNowOpen}
        onClose={() => setIsOrderNowOpen(false)}
        subscription={subscription}
        order={nextOrder}
      />

      <CancelSubscriptionForm
        isOpen={isCancelSubscriptionOpen}
        onClose={() => setIsCancelSubscriptionOpen(false)}
        subscription={subscription}
        refetchSubscriptions={refetchSubscriptions}
      />

      <PaymentMethodRechargeForm
        isOpen={isPaymentMethodOpen}
        onClose={() => setIsPaymentMethodOpen(false)}
        addressId={subscription.address_id}
      />
    </>
  );
};
