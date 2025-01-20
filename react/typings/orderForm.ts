export interface OrderFormProps {
	orderForm: OrderForm;
}

interface OrderForm {
	id: string;
	items: Item[];
	value: number;
	totalizers: Totalizer[];
	marketingData: MarketingData;
	canEditData: boolean;
	loggedIn: boolean;
	paymentData: PaymentData;
	messages: Messages;
	shipping: Shipping;
	userProfileId: null;
	userType: string;
	clientProfileData: null;
	clientPreferencesData: ClientPreferencesData;
	allowManualPrice: boolean;
	customData: null;
	__typename: string;
}

interface ClientPreferencesData {
	locale: string;
	optInNewsletter: null;
	__typename: string;
}

interface Shipping {
	countries: string[];
	availableAddresses: AvailableAddress[];
	selectedAddress: AvailableAddress;
	deliveryOptions: DeliveryOption[];
	pickupOptions: any[];
	isValid: boolean;
	__typename: string;
}

interface DeliveryOption {
	id: string;
	deliveryChannel: string;
	price: number;
	estimate: string;
	isSelected: boolean;
	__typename: string;
}

interface AvailableAddress {
	addressId: string;
	addressType: string;
	city: null;
	complement: null;
	country: string;
	neighborhood: null;
	number: null;
	postalCode: string;
	receiverName: null;
	reference: null;
	state: null;
	street: null;
	isDisposable: boolean;
	geoCoordinates: any[];
	__typename: string;
}

interface Messages {
	couponMessages: any[];
	generalMessages: any[];
	__typename: string;
}

interface PaymentData {
	paymentSystems: PaymentSystem[];
	payments: any[];
	installmentOptions: InstallmentOption[];
	availableAccounts: any[];
	isValid: boolean;
	__typename: string;
}

interface InstallmentOption {
	paymentSystem: string;
	installments: Installment[];
	__typename: string;
}

interface Installment {
	count: number;
	hasInterestRate: boolean;
	interestRate: number;
	value: number;
	total: number;
	__typename: string;
}

interface PaymentSystem {
	id: string;
	name: string;
	groupName: string;
	validator: Validator;
	stringId: string;
	requiresDocument: boolean;
	isCustom: boolean;
	description: null;
	requiresAuthentication: boolean;
	dueDate: string;
	__typename: string;
}

interface Validator {
	regex: null | string;
	mask: null | string;
	cardCodeRegex: null | string;
	cardCodeMask: null | string;
	weights: number[] | null;
	useCvv: boolean;
	useExpirationDate: boolean;
	useCardHolderName: boolean;
	useBillingAddress: boolean;
	__typename: string;
}

interface MarketingData {
	coupon: string;
	utmCampaign: string;
	utmMedium: string;
	utmSource: string;
	utmiCampaign: string;
	utmiPart: string;
	utmiPage: string;
	__typename: string;
}

interface Totalizer {
	id: string;
	name: string;
	value: number;
	__typename: string;
}

interface Item {
	additionalInfo: AdditionalInfo;
	attachments: any[];
	attachmentOfferings: any[];
	bundleItems: any[];
	parentAssemblyBinding: null;
	parentItemIndex: null;
	sellingPriceWithAssemblies: null;
	options: null;
	availability: string;
	detailUrl: string;
	id: string;
	imageUrls: ImageUrls;
	listPrice: number;
	manualPrice: null;
	measurementUnit: string;
	modalType: null;
	name: string;
	offerings: any[];
	price: number;
	priceTags: PriceTag[];
	productCategories: ProductCategories;
	productCategoryIds: string;
	productRefId: string;
	productId: string;
	quantity: number;
	seller: string;
	sellingPrice: number;
	skuName: string;
	skuSpecifications: any[];
	unitMultiplier: number;
	uniqueId: string;
	refId: string;
	isGift: boolean;
	priceDefinition: PriceDefinition;
	__typename: string;
}

interface PriceDefinition {
	calculatedSellingPrice: number;
	total: number;
	sellingPrices: SellingPrice[];
	__typename: string;
}

interface SellingPrice {
	quantity: number;
	value: number;
	__typename: string;
}

interface ProductCategories {
	"20315": string;
	"20337": string;
	"20324"?: string;
	"20326"?: string;
}

interface PriceTag {
	identifier: string;
	isPercentual: boolean;
	name: string;
	rawValue: number;
	value: number;
	__typename: string;
	ratesAndBenefitsIdentifier: null;
}

interface ImageUrls {
	at1x: string;
	at2x: string;
	at3x: string;
	__typename: string;
}

interface AdditionalInfo {
	brandName: string;
	__typename: string;
}
