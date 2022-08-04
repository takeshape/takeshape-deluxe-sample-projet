import { RadioGroup } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';
import { ProductOptionValue } from 'types/product';
import classNames from 'utils/classNames';

export interface ProductSizeSelectProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  options: ProductOptionValue[];
  size?: 'large' | 'small';
}

export const ProductSizeSelect = ({ value, onChange, options, size }: ProductSizeSelectProps) => {
  size = size ?? 'large';
  const wrapperStyles = classNames(size === 'large' && 'sm:grid-cols-8 lg:grid-cols-4', 'grid grid-cols-4 gap-4');
  const buttonStyles = classNames(
    size === 'large' && 'sm:py-6',
    'group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-primary-100 focus:outline-none sm:flex-1'
  );

  return (
    <RadioGroup value={value} onChange={onChange} className="mt-4">
      <RadioGroup.Label className="sr-only">Choose a size</RadioGroup.Label>
      <div className={wrapperStyles}>
        {options.map((size) => (
          <RadioGroup.Option
            key={size.value}
            value={size.value}
            disabled={!size.hasStock}
            className={({ active }) =>
              classNames(
                size.hasStock
                  ? 'bg-formBackground shadow-sm text-formText-900 cursor-pointer'
                  : 'bg-formText-50 text-formText-200 cursor-not-allowed',
                active ? 'ring-2 ring-accent-500' : '',
                buttonStyles
              )
            }
          >
            {({ active, checked }) => (
              <>
                <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                {size.hasStock ? (
                  <span
                    className={classNames(
                      active ? 'border' : 'border-2',
                      checked ? 'border-accent-500' : 'border-transparent',
                      'absolute -inset-px rounded-md pointer-events-none'
                    )}
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    aria-hidden="true"
                    className="absolute -inset-px rounded-md border-2 border-formText-200 pointer-events-none"
                  >
                    <svg
                      className="absolute inset-0 w-full h-full text-formText-200 stroke-2"
                      viewBox="0 0 100 100"
                      preserveAspectRatio="none"
                      stroke="currentColor"
                    >
                      <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                    </svg>
                  </span>
                )}
              </>
            )}
          </RadioGroup.Option>
        ))}
      </div>
    </RadioGroup>
  );
};

export default ProductSizeSelect;
