import { PropsWithChildren } from 'react';

export interface AccountOverviewFormActionsProps {
  error?: string;
  isReady?: boolean;
  isSubmitting?: boolean;
  isSubmitSuccessful?: boolean;
  isValid?: boolean;
}

export const AccountOverviewFormActions = ({
  error,
  isReady,
  isSubmitting,
  isSubmitSuccessful,
  isValid
}: PropsWithChildren<AccountOverviewFormActionsProps>) => {
  return (
    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <div className="flex justify-end">
        {error && (
          <div className="inline-flex justify-center py-2 px-4 text-sm font-medium text-red-800">Error: {error}</div>
        )}
        {isSubmitting && (
          <div className="inline-flex justify-center py-2 px-4 text-sm font-medium text-gray-500">Saving...</div>
        )}
        {isSubmitSuccessful && (
          <div className="inline-flex justify-center py-2 px-4 text-sm font-medium text-gray-500">Saved</div>
        )}
        <button
          disabled={!isReady || isSubmitting || !isValid}
          type="submit"
          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AccountOverviewFormActions;
