// UClick/src/components/ui/Rating.tsx

interface RatingProps {
  value: number; // 0-5
  maxValue?: number;
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  maxValue = 5,
  size = 'medium',
  showValue = true,
  className = '',
}) => {
  const sizeClasses = {
    small: 'text-sm',
    medium: 'text-base',
    large: 'text-lg',
  };

  const stars = Array.from({ length: maxValue }, (_, index) => {
    const starValue = index + 1;
    const isFilled = starValue <= value;
    const isHalfFilled = starValue - 0.5 <= value && starValue > value;

    return (
      <span
        key={index}
        className={`inline-block ${
          isFilled
            ? 'text-yellow-400'
            : isHalfFilled
            ? 'text-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      >
        {isFilled || isHalfFilled ? '★' : '☆'}
      </span>
    );
  });

  return (
    <div
      className={`flex items-center gap-1 ${sizeClasses[size]} ${className}`}
    >
      <div className="flex">{stars}</div>
      {showValue && (
        <span className="text-gray-600 dark:text-gray-400 font-medium">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
};
