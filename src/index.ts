/**
 * Supported locale codes for number formatting
 * - 'en': English (1,234.56)
 * - 'de': German (1.234,56)
 * - 'fr': French (1 234,56)
 * - 'es': Spanish (1.234,56)
 * - 'in': Indian (1,234.56 with Indian numbering)
 * - 'it': Italian (1.234,56)
 * - 'ch': Swiss (1'234.56)
 * - 'se': Swedish (1 234,56)
 */
export type LocaleCode = 'en' | 'de' | 'fr' | 'es' | 'in' | 'it' | 'ch' | 'se';

/**
 * Supported number systems
 * - 'international': Uses K, M, B, T suffixes (1K, 1M, 1B, 1T)
 * - 'indian': Uses Indian number system suffixes (K, L, Cr)
 */
export type SystemType = 'international' | 'indian';

/**
 * Supported formatting styles
 * - 'short': Shows short format (1k, 1M, 1B, 1T)
 * - 'long': Shows long format (1 thousand, 1 million, 1 billion, 1 trillion)
 */
export type FormatStyle = 'short' | 'long';

/**
 * Combined type for all supported format types
 */
export type FormatType = LocaleCode | SystemType;

/**
 * Configuration for number formatting
 */
type NumberFormat = {
    /** Decimal separator character (e.g., '.' or ',') */
    decimal: string;
    /** Thousands separator character (e.g., ',', '.', ' ', or ''') */
    thousand: string;
    /** Number system to use ('international' or 'indian') */
    system: SystemType;
}

/**
 * Options for numify function
 */
export interface NumifyOptions {
    /** 
     * The locale or number system to use
     * @example 'en' for English format
     * @example 'indian' for Indian number system
     */
    formatType?: FormatType;
    /** 
     * Whether to show decimal places
     * @default false
     */
    precise?: boolean;
    /**
     * Format style to use
     * @default 'short'
     */
    style?: FormatStyle;
}

/**
 * Options for formatNumber function
 */
export interface FormatNumberOptions {
    /** 
     * The locale or number system to use
     * @example 'en' for English format
     * @example 'de' for German format
     */
    formatType?: FormatType;
}

/**
 * Locale-specific formatting configurations
 */
const FORMAT_LOCALES: Record<LocaleCode, NumberFormat> = {
    'en': { decimal: '.', thousand: ',', system: 'international' },
    'de': { decimal: ',', thousand: '.', system: 'international' },
    'fr': { decimal: ',', thousand: ' ', system: 'international' },
    'es': { decimal: ',', thousand: '.', system: 'international' },
    'in': { decimal: '.', thousand: ',', system: 'indian' },
    'it': { decimal: ',', thousand: '.', system: 'international' },
    'ch': { decimal: '.', thousand: "'", system: 'international' },
    'se': { decimal: ',', thousand: ' ', system: 'international' },
};

const LONG_UNITS: Record<string, string> = {
    'k': 'thousand',
    'M': 'million', 
    'B': 'billion',
    'T': 'trillion',
    'E': 'quintillion',
    'P': 'quadrillion',
    'Cr': 'crore',
    'L': 'lakh',
} as const;

/**
 * Gets formatting configuration for the specified format type
 * @param format - The format type to get configuration for
 * @returns The number format configuration
 */
const getFormat = (format: FormatType): NumberFormat => {
    if (!format) {
        return FORMAT_LOCALES['en']; // Default to English format if format is undefined
    }
    if (format === 'international' || format === 'indian') {
        return { 
            decimal: '.', 
            thousand: ',', 
            system: format 
        };
    }
    return FORMAT_LOCALES[format] || FORMAT_LOCALES['en']; // Fallback to English if invalid format
}

/**
 * Converts a number to a human readable format with suffixes
 * @param num - The number to convert
 * @param options - Configuration options
 * @returns The formatted number as a string
 * 
 * @example International format (default)
 * ```typescript
 * numify(1234) // "1.23k"
 * numify(1234567) // "1.23M"
 * numify(1234567890) // "1.23B"
 * ```
 * 
 * @example Indian format
 * ```typescript
 * numify(1234, { formatType: 'in' }) // "1.23K"
 * numify(123456, { formatType: 'in' }) // "1.23L"
 * numify(12345678, { formatType: 'in' }) // "1.23Cr"
 * ```
 * 
 * @example With precise option
 * ```typescript
 * numify(1234, { precise: true }) // "1.234k"
 * ```
 * 
 * @example With long format
 * ```typescript
 * numify(1234, { style: 'long' }) // "1.23 thousand"
 * numify(1234567, { style: 'long' }) // "1.23 million"
 * ```
 */
export const numify = (
    num: number,
    options: NumifyOptions = {}
): string => {
    const { formatType = 'en', precise = false, style = 'short' } = options;
    num = Number(num.toString().replace(/[^0-9.]/g, ""));
    const format = getFormat(formatType);
    
    if (num < 1000) {
        return precise 
            ? num.toFixed(2).replace('.', format.decimal)
            : num.toString();
    }

    const units: [number, string][] = format.system === 'indian' 
        ? [
            [1e7, "Cr"],
            [1e5, "L"],
            [1e3, "K"]
          ]
        : [
            [1e18, "E"],
            [1e15, "P"],
            [1e12, "T"],
            [1e9, "B"],
            [1e6, "M"],
            [1e3, "k"]
          ];

    const unit = units.find(([value]) => num >= value);
    if (!unit) return num.toString();

    const value = (num / unit[0])
        .toFixed(2)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1")
        .replace('.', format.decimal);

    const suffix = style === 'long' ? ` ${LONG_UNITS[unit[1]]}` : unit[1];
    return value + suffix;
}

/**
 * Formats a number with thousand separators according to locale
 * @param num - The number to format
 * @param options - Configuration options
 * @returns The formatted number as a string
 * 
 * @example Different locales
 * ```typescript
 * formatNumber(1234567.89) // "1,234,567.89" (en)
 * formatNumber(1234567.89, { formatType: 'de' }) // "1.234.567,89"
 * formatNumber(1234567.89, { formatType: 'fr' }) // "1 234 567,89"
 * formatNumber(1234567.89, { formatType: 'ch' }) // "1'234'567.89"
 * ```
 */
export const formatNumber = (
    num: number,
    options: FormatNumberOptions = {}
): string => {
    const { formatType = 'en' } = options;
    const format = getFormat(formatType);
    const parts = num.toString().split('.');
    
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, format.thousand);
    
    return parts.length > 1 
        ? parts.join(format.decimal)
        : parts[0];
}