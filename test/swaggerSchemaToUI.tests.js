/* eslint-disable max-len */
describe("swaggerSchemaToUI", () => {
  const expect = require("chai").expect;
  const {
    swaggerSchemaToUI
  } = require("../lib/swaggerSchemaToUI");
  let schema = null;

  beforeEach(function () {
    schema = {
      definitions: {
        Info: {
          required: [
            "status",
            "services"
          ],
          properties: {
            status: {
              type: "integer",
              format: "int32",
              enum: [
                200,
                404,
                500
              ]
            },
            services: {
              type: "array",
              items: {
                $ref: "#/definitions/Service"
              }
            }
          },
          type: "object"
        },
        Service: {
          required: [
            "name",
            "status"
          ],
          properties: {
            name: {
              type: "string",
              description: "The name of the service that this api consumes"
            },
            status: {
              type: "integer",
              format: "int32",
              enum: [
                200,
                400,
                401,
                403,
                404,
                407,
                408,
                409,
                410,
                500
              ]
            }
          },
          type: "object"
        },
        BzDate: {
          required: [
            "value",
            "offset"
          ],
          properties: {
            value: {
              type: "string",
              format: "date-time"
            },
            offset: {
              type: "integer",
              format: "int32"
            }
          },
          type: "object"
        },
        Countries: {
          properties: {
            countries: {
              type: "array",
              items: {
                $ref: "#/definitions/Country"
              }
            }
          },
          type: "object"
        },
        Country: {
          required: [
            "_id",
            "name",
            "ISO"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            name: {
              type: "string",
              description: "The name of the country"
            },
            ISO: {
              type: "string",
              minLength: 2,
              maxLength: 3,
              description: "The ISO code of the country"
            },
            ord: {
              type: "integer",
              description: "The sort order for the countries",
              format: "int32"
            },
            provinces: {
              type: "array",
              description: "List of states or provinces for the country, empty for countries other than Canada and USA",
              items: {
                $ref: "#/definitions/Province"
              }
            }
          },
          type: "object"
        },
        Province: {
          required: [
            "name"
          ],
          properties: {
            name: {
              type: "string",
              description: "The name of the province"
            }
          },
          type: "object"
        },
        Provinces: {
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/definitions/Province"
              }
            }
          },
          type: "object"
        },
        Bundles: {
          properties: {
            bundles: {
              type: "array",
              items: {
                $ref: "#/definitions/BundlesBundle"
              }
            }
          },
          type: "object"
        },
        BundlesBundle: {
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the bundle"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            name: {
              type: "string",
              description: "The name of the bundle"
            },
            productTypes: {
              type: "array",
              items: {
                $ref: "#/definitions/BundleProductType"
              }
            },
            value: {
              type: "integer",
              format: "int32",
              description: "The value for the bundle"
            },
            valueType: {
              type: "string",
              description: "Indicate the type of value, dollar or discount",
              enum: [
                "$",
                "%"
              ]
            },
            bundleType: {
              type: "string",
              description: "The bundle type, is the same as productType from the product definitions"
            },
            expirationDays: {
              type: "integer",
              format: "int32",
              description: "The number of days before the redeemable items generated by this bundle expire"
            },
            redeemByCustomer: {
              type: "boolean",
              description: "Indicates if the redeemable items generated by this bundle can be redeemed only by the customer"
            },
            terms: {
              type: "string",
              description: "The terms and conditions for the bundle"
            },
            redempInstr: {
              type: "string",
              description: "The bundle redemption instructions"
            },
            disabled: {
              type: "boolean",
              description: "Indicates if this bundle is disabled"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The date the bundle was created"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The date the bundle was updated"
            },
            lexiconKeys: {
              $ref: "#/definitions/BundleLexiconKeys"
            }
          },
          type: "object"
        },
        BundleLexiconKeys: {
          properties: {
            name: {
              type: "string",
              description: "The lexicon key for the bundle name"
            },
            terms: {
              type: "string",
              description: "The lexicon key for the bundle terms"
            },
            redempInstr: {
              type: "string",
              description: "The lexicon key for the redemption instructions"
            }
          },
          type: "object"
        },
        BundleProductType: {
          properties: {
            type: {
              type: "string",
              description: "The product Type"
            },
            name: {
              type: "string",
              description: "The name of the product"
            },
            qty: {
              type: "string",
              description: "The number of redeemable items to generate"
            },
            tripType: {
              type: "string",
              description: "The trip type",
              enum: [
                "oneway"
              ]
            },
            tripTypeDisplay: {
              type: "string",
              description: "The trip type display name"
            },
            fare: {
              type: "string",
              description: "The fare name"
            },
            fareId: {
              type: "string",
              description: "The fare id"
            },
            origin: {
              type: "string",
              description: "The origin name"
            },
            destination: {
              type: "string",
              description: "The destination name"
            },
            origin_id: {
              type: "string",
              description: "The origin id"
            },
            destination_id: {
              type: "string",
              description: "The destination id"
            },
            route: {
              $ref: "#/definitions/BundleProductTypeRoute"
            },
            id: {
              type: "string",
              description: "The product unique id"
            }
          },
          type: "object"
        },
        BundleProductTypeRoute: {
          properties: {
            origin: {
              type: "string",
              description: "The origin name"
            },
            destination: {
              type: "string",
              description: "The destination name"
            },
            origin_id: {
              type: "string",
              description: "The origin id"
            },
            destination_id: {
              type: "string",
              description: "The destination id"
            }
          },
          type: "object"
        },
        Products: {
          properties: {
            products: {
              type: "array",
              items: {
                $ref: "#/definitions/Product"
              }
            }
          },
          type: "object"
        },
        Companies: {
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the company"
            },
            companyId: {
              type: "string",
              description: "identifier given by the user"
            },
            name: {
              type: "string",
              description: "The name of the company"
            },
            phoneNumber: {
              type: "string",
              description: "The phoneNumber of the company"
            },
            address: {
              type: "string",
              description: "The address of the company"
            },
            city: {
              type: "string",
              description: "The city of the company"
            },
            province: {
              type: "string",
              description: "The province of the company"
            },
            country: {
              type: "string",
              description: "The country of the company"
            },
            zipCode: {
              type: "string",
              description: "The name of the company"
            },
            firstName: {
              type: "string",
              description: "The first name of the company representative"
            },
            lastName: {
              type: "string",
              description: "The last name of the company representative"
            },
            search: {
              type: "string",
              description: "The name of the company"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          type: "object"
        },
        Product: {
          type: "object",
          required: [
            "type",
            "name",
            "accountId"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the product"
            },
            name: {
              type: "string",
              description: "The name of the product"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            type: {
              type: "string",
              description: "A computer friendly representation of the product name"
            },
            hasRoutes: {
              type: "boolean",
              description: "Indicates if this product use routes and schedules"
            },
            ord: {
              type: "integer",
              format: "int32",
              description: "The order this product will be shown in product pages"
            },
            hasFares: {
              type: "boolean",
              description: "Indicate if this product uses fares"
            },
            terms: {
              type: "string",
              description: "The terms and conditions for this product, usually in the account first language"
            },
            hasPassengerInfo: {
              type: "boolean",
              description: "Indicates if this product requires to collect passenger or attendee information"
            },
            hasDates: {
              type: "boolean",
              description: "Indicates if this products needs a date to be selected, ex reservation family products"
            },
            hasQty: {
              type: "boolean",
              description: "Indicates if this product has limited qtys"
            },
            readOnly: {
              type: "boolean",
              description: "This product can be shown but can't be purchased"
            },
            isBundle: {
              type: "boolean",
              description: "Indicates if this product is a bundle"
            },
            isParcel: {
              type: "boolean",
              description: "Indicates if this products is a parcel"
            },
            isPass: {
              type: "boolean",
              description: "Indicates if this products is a monthly pass"
            },
            isFlexPass: {
              type: "boolean",
              description: "Indicates if this products is a flex pass"
            },
            family: {
              type: "string",
              description: "Indicates the family the product belongs to"
            },
            availableChannels: {
              $ref: "#/definitions/productAvChannels"
            },
            cutoffs: {
              $ref: "#/definitions/productCutoffs"
            },
            icon: {
              type: "string",
              description: "A font-awesome css class to be used as the icon in UI for this product, websales channels and shopping carts"
            },
            description: {
              type: "string",
              description: "A short description for the product, to be used mostly in websales channels"
            },
            products: {
              type: "array",
              items: {
                $ref: "#/definitions/ProductProducts"
              }
            },
            taxProductFrom: {
              type: "string",
              description: "Indicates if taxes are going to be applied by the point of 'origin', 'destination', or just all taxes configured in the account"
            },
            lexiconKeys: {
              $ref: "#/definitions/productLexiconKeys"
            },
            useStationGroups: {
              type: "boolean",
              description: "Indicates if we should use a Station group to pre-select Origin & Destination"
            },
            useAutocomplete: {
              type: "boolean",
              description: "Indicates if we should use an autocomplete field for the Origin and Destination (and station groups) fields"
            },
            todayDefaultForOutbound: {
              type: "boolean",
              description: "Outbound trips date default to today"
            },
            earlySeatSelection: {
              type: "boolean",
              description: "Select the seat at the same time you select the trip"
            }
          }
        },
        productAvChannels: {
          description: "The channels this product is available for sell or purchase",
          type: "object",
          properties: {
            inPerson: {
              type: "boolean",
              description: "This product is available in back-office channels"
            },
            online: {
              type: "boolean",
              description: "This product is available in websales channels"
            }
          }
        },
        productCutoffs: {
          type: "object",
          description: "The cutoff in minutes per channel to stop selling for the product",
          properties: {
            inPerson: {
              $ref: "#/definitions/cuttoffsInObj"
            },
            online: {
              $ref: "#/definitions/cuttoffsInObj"
            }
          }
        },
        cuttoffsInObj: {
          properties: {
            minutes: {
              type: "integer",
              format: "int32",
              description: "The numbers of minutes to stop selling the product in a channel"
            },
            point: {
              type: "string",
              description: "Indicate if the cutoff will be applied at the 'start' of the trip or at a given 'station'"
            }
          },
          type: "object"
        },
        productLexiconKeys: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The lexicon key for the name of the product"
            },
            description: {
              type: "string",
              description: "The lexicon key for the description of the product"
            },
            terms: {
              type: "string",
              description: "The lexicon key for the terms of the product"
            }
          }
        },
        ProductProducts: {
          properties: {
            type: {
              type: "string",
              description: "The type of product"
            },
            name: {
              type: "string",
              description: "The none localized name of the product"
            },
            uses: {
              type: "integer",
              format: "int32",
              description: "The number of uses a ticket for this product will have"
            },
            expire: {
              type: "integer",
              format: "int32",
              description: "The number of days for a ticket for this product to expire after either purchase of travel date"
            },
            qty: {
              $ref: "#/definitions/productQty"
            },
            priceAdjustment: {
              $ref: "#/definitions/productPriceAdj"
            },
            channels: {
              $ref: "#/definitions/productChannels"
            },
            returnDateDefault: {
              type: "boolean"
            }
          },
          type: "object"
        },
        productQty: {
          properties: {
            min: {
              type: "integer",
              format: "int32"
            },
            max: {
              type: "integer",
              format: "int32"
            }
          },
          type: "object"
        },
        productPriceAdj: {
          properties: {
            type: {
              type: "string"
            },
            value: {
              type: "integer",
              format: "int32"
            },
            times: {
              type: "integer",
              format: "int32"
            }
          },
          type: "object"
        },
        productChannels: {
          properties: {
            backoffice: {
              type: "boolean"
            },
            websales: {
              type: "boolean"
            }
          },
          type: "object"
        },
        Insurances: {
          properties: {
            insurances: {
              type: "array",
              items: {
                $ref: "#/definitions/Insurance"
              }
            }
          },
          type: "object"
        },
        Item: {
          required: [
            "accountId",
            "productId",
            "disabled"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            productId: {
              type: "string",
              description: "The productId associated to this Item"
            },
            name: {
              type: "string",
              description: "The name of the Item"
            },
            productName: {
              type: "string",
              description: "The name of the product associated to this item"
            },
            amount: {
              type: "integer",
              format: "int32",
              description: "The cost of the Item"
            },
            amountEditable: {
              type: "boolean",
              description: "Indicate if the amount is editable when selling it"
            },
            taxable: {
              type: "boolean",
              description: "Indicates if the item is taxable"
            },
            printable: {
              type: "boolean",
              description: "Indicates if we will print a pdf for the item"
            },
            disabled: {
              type: "boolean"
            },
            fields: {
              type: "object"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            identicalNotesAndDescription: {
              type: "boolean",
              description: "Indicates if the notes and description fields for the item should be identical when buying it this will be enforced on purchase and is useful to validate that the user enters a needed value and the value is correct."
            }
          },
          type: "object"
        },
        Insurance: {
          type: "object",
          required: [
            "accountId",
            "productId",
            "enabled"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            productId: {
              type: "string",
              description: "The productId associated to the insurance"
            },
            threshold: {
              type: "integer",
              format: "int32"
            },
            cost: {
              type: "integer",
              format: "int32"
            },
            minimun: {
              type: "integer",
              format: "int32"
            },
            thresholdToDisplay: {
              type: "string"
            },
            costToDisplay: {
              type: "string"
            },
            minimunToDisplay: {
              type: "string"
            },
            enabled: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Brands: {
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of brands"
            },
            previous: {
              type: "string",
              description: "The link to the previous page"
            },
            next: {
              type: "string",
              description: "The link to the next page"
            },
            brands: {
              type: "array",
              items: {
                $ref: "#/definitions/Brand"
              }
            }
          },
          type: "object"
        },
        Brand: {
          type: "object",
          required: [
            "name"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the brand"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The brand name"
            },
            enabled: {
              type: "boolean",
              description: "Status of the brand. Default: true"
            },
            logo: {
              type: "string",
              description: "The URL of the default brand logo"
            }
          }
        },
        OperatingCompanies: {
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of OperatingCompanies"
            },
            previous: {
              type: "string",
              description: "The link to the previous page"
            },
            next: {
              type: "string",
              description: "The link to the next page"
            },
            operatingCompanies: {
              type: "array",
              items: {
                $ref: "#/definitions/OperatingCompany"
              }
            }
          },
          type: "object"
        },
        OperatingCompanySaveRequest: {
          type: "object",
          required: [
            "name",
            "infoOnPrintedTicket",
            "enabled"
          ],
          properties: {
            name: {
              type: "string",
              description: "The operating company name, only used in lists in the backend"
            },
            infoOnPrintedTicket: {
              type: "string",
              description: "The information to print in the ticket"
            },
            enabled: {
              type: "boolean",
              description: "If disabled, this operating company can't be associated to new schedules"
            }
          }
        },
        OperatingCompany: {
          type: "object",
          required: [
            "name"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the company"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The company name"
            },
            infoOnPrintedTicket: {
              type: "string",
              description: "The information to print in the ticket"
            },
            enabled: {
              type: "boolean",
              description: "If disabled, this operating company can't be associated to new schedules"
            },
            createdBy: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            updatedBy: {
              type: "string",
              description: "The unique identifier for the user that last updated it"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Fares: {
          properties: {
            fares: {
              type: "array",
              items: {
                $ref: "#/definitions/Fare"
              }
            }
          },
          type: "object"
        },
        Fare: {
          type: "object",
          required: [
            "accountId",
            "userId",
            "name",
            "indexableName",
            "ord",
            "isBaseFare",
            "isCompanion",
            "requiresCompanion",
            "requiresExtraUserInput",
            "saveExtraUserInput"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the object"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            name: {
              type: "string",
              description: "The name of the fare"
            },
            indexableName: {
              type: "string",
              description: "Normalized name to be indexed in the db"
            },
            defaultQty: {
              type: "integer",
              format: "int32",
              description: "The default qty for this fare to show in the fare selector when a new sale starts"
            },
            description: {
              type: "string",
              description: "Some extra fare information that will be printed in the ticket"
            },
            ord: {
              type: "integer",
              format: "int32",
              description: "How to sort the fares for display, fares are sorted by this value and alphabetically"
            },
            isBaseFare: {
              type: "boolean",
              description: "indicates if this is the base fare for a given product"
            },
            adjustmentType: {
              type: "string",
              description: "One of $ or %"
            },
            adjustment: {
              type: "integer",
              format: "int32"
            },
            minimumValue: {
              type: "integer",
              format: "int32"
            },
            minQtyForVolumeDiscount: {
              type: "integer",
              format: "int32",
              description: "The minimum number of tickets of this fare to start applying the volume discount"
            },
            volumeDiscountType: {
              type: "string",
              description: "Always '%'"
            },
            volumeDiscount: {
              type: "integer",
              format: "int32",
              description: "The percentage to apply as a discount"
            },
            isCompanion: {
              type: "boolean"
            },
            requiresCompanion: {
              type: "boolean"
            },
            requiresCompanionErrMsg: {
              type: "string"
            },
            productTypes: {
              type: "array",
              description: "A list of product this fare is associated with",
              items: {
                type: "string",
                description: "A product type"
              }
            },
            channels: {
              description: "Channels where this fare will be available",
              $ref: "#/definitions/FareChannels"
            },
            productIds: {
              type: "array",
              description: "A list of product Ids this fare is associated with",
              items: {
                type: "string",
                description: "A product Id"
              }
            },
            adjustmentsOverrides: {
              type: "array",
              items: {
                $ref: "#/definitions/AdjustmentsOverride"
              }
            },
            disabled: {
              type: "boolean"
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            lexiconKeys: {
              $ref: "#/definitions/FareLexiconKeys"
            },
            requiresDimensions: {
              type: "boolean",
              description: "Only needed for fares associated to products of family parcel"
            },
            dimensions: {
              $ref: "#/definitions/Dimensions"
            },
            displayOnCombo: {
              type: "boolean",
              description: "If true this fares will be displayed in a combo in the UI"
            },
            requiresExtraUserInput: {
              type: "boolean",
              description: "Enables a field to require extra info"
            },
            extraUserInputValidation: {
              type: "string",
              description: "Regex to validate input format"
            },
            saveExtraUserInput: {
              type: "boolean",
              description: "Save the field in the database"
            },
            extraUserInputMask: {
              type: "string",
              description: "Regex to mask the input before saving to database or empty"
            }
          }
        },
        FareChannels: {
          type: "object",
          properties: {
            "backoffice": {
              $ref: "#/definitions/FareBackOfficeChannel",
              description: "Hold properties that indicate how the fare behaves in the 'backoffice' channel"
            },
            "agency-backoffice": {
              $ref: "#/definitions/FareBackOfficeChannel",
              description: "Hold properties that indicate how the fare behaves in the 'agency-backoffice' channel"
            },
            "websales": {
              $ref: "#/definitions/FareWebsalesChannel",
              description: "Hold properties that indicate how the fare behaves in the 'websales' channel"
            },
            "agency-websales": {
              $ref: "#/definitions/FareBackOfficeChannel",
              description: "Hold properties that indicate how the fare behaves in the 'agency-websales' channel"
            }
          }
        },
        FareWebsalesChannel: {
          properties: {
            available: {
              type: "boolean",
              description: "Indicates if that fare is available in the websales channel"
            },
            maxQty: {
              type: "integer",
              format: "int32",
              minimum: 1
            },
            adjustmentType: {
              type: "string"
            },
            adjustment: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "The value to use for the adjustment, default is 0"
            }
          },
          type: "object"
        },
        FareBackOfficeChannel: {
          properties: {
            available: {
              type: "boolean",
              description: "Indicates if that fare is available in the channel"
            },
            maxQty: {
              type: "integer",
              format: "int32",
              minimum: 0
            }
          },
          type: "object"
        },
        CreateFareClassRequest: {
          type: "object",
          required: [
            "productIds",
            "name"
          ],
          properties: {
            productIds: {
              type: "array",
              description: "The products this fareClass will be associated with",
              items: {
                type: "string"
              }
            },
            name: {
              type: "string",
              description: "The name of the fare class"
            },
            description: {
              type: "string",
              description: "The description of the fare class"
            },
            terms: {
              type: "string",
              description: "The terms of the fare class"
            },
            changeable: {
              type: "boolean",
              description: "Determines if a fare in this fare class is changeable"
            },
            cancellable: {
              type: "boolean",
              description: "Determines if a fare in this fare class is cancellable"
            },
            disabled: {
              type: "boolean",
              description: "Determines if this fare class is enabled or disabled"
            },
            lexiconKeys: {
              $ref: "#/definitions/FareClassLexiconKeys"
            }
          }
        },
        FareClassUpdateRequest: {
          type: "object",
          description: "An object listing the properties of the existing Fare Class that should be changed.",
          properties: {
            productIds: {
              description: "An array of the updated Product IDs that the Fare Class should be associated with.",
              type: "array",
              items: {
                type: "string"
              }
            },
            name: {
              type: "string",
              description: "The Fare Class' new non-localized name (for developer use - not for display)"
            },
            description: {
              type: "string",
              description: "The Fare Class' new non-localized description (for developer use - not for display)"
            },
            terms: {
              type: "string",
              description: "The Fare Class' new non-localized terms and conditions (for developer use - not for display)"
            },
            changeable: {
              type: "boolean",
              description: "Determines if a fare in this Fare Class is changeable"
            },
            cancellable: {
              type: "boolean",
              description: "Determines if a fare in this Fare Class is cancellable"
            },
            disabled: {
              type: "boolean",
              description: "Determines if this Fare Class is enabled or disabled"
            },
            lexiconKeys: {
              $ref: "#/definitions/FareClassLexiconKeysUpdate"
            }
          }
        },
        FareClass: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the fare class"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            productIds: {
              type: "array",
              description: "The products this fareClass will be associated with",
              items: {
                type: "string"
              }
            },
            name: {
              type: "string",
              description: "The name of the fare class"
            },
            description: {
              type: "string",
              description: "The description of the fare class"
            },
            terms: {
              type: "string",
              description: "The terms of the fare class"
            },
            changeable: {
              type: "boolean",
              description: "Determines if a fare in this fare class is changeable"
            },
            cancellable: {
              type: "boolean",
              description: "Determines if a fare in this fare class is cancellable"
            },
            disabled: {
              type: "boolean",
              description: "Determines if this fare class is enabled or disabled"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            createdBy: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            updatedBy: {
              type: "string",
              description: "The unique identifier for the user that last updated it"
            },
            lexiconKeys: {
              $ref: "#/definitions/FareClassLexiconKeys"
            }
          }
        },
        FareClasses: {
          type: "object",
          properties: {
            fareClasses: {
              description: "An array of Fare Class objects",
              type: "array",
              items: {
                $ref: "#/definitions/FareClass"
              }
            }
          }
        },
        JourneyPriceRequest: {
          type: "object",
          required: [
            "originId",
            "destinationId",
            "price"
          ],
          properties: {
            productId: {
              type: "string",
              description: "The ID of the Product that is targeted by this Journey Pricing Rule. If this value is 'null', this rule will target any product. This value defaults to 'null'."
            },
            fareClassIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of all the Fare Classes that are targeted by this Journey Pricing Rule. If this value is 'null', this rule will target all fare classes configured for your account. This value defaults to 'null'."
            },
            fareIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of all the Fares that are targeted by this Journey Pricing Rule. If this value is 'null', this rule will target all fares. This value defaults to 'null'."
            },
            amenityGroupIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of all the Amenity Groups that are targeted by this Journey Pricing Rule. If this value is 'null', this rule will target all amenity groups configured for your account. This value defaults to 'null'."
            },
            brandIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of all the Brands that are targeted by this Journey Pricing Rule. If this value is 'null', this rule will target all brands configured for your account. This value defaults to 'null'."
            },
            originId: {
              type: "string",
              description: "The ID of the Origin Station that this Journey Pricing Rule applies to"
            },
            destinationId: {
              type: "string",
              description: "The ID of the Destination Station that this Journey Pricing Rule applies to"
            },
            price: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "Trip purchases that match all of the parameters of this Journey Pricing Rule will be assigned this base price."
            },
            openReturnPrice: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "Trip purchases with ticket.type='openreturn' that match all of the parameters of this Journey Pricing Rule will be assigned this base price, if defined, instead of the regular 'price'. You may set this value to 'null'."
            },
            currency: {
              type: "string",
              description: "The currency that the 'price' is specified in. Must be an ISO 4217 currency code. Trip searches that are performed in a particular currency will prefer journey pricing rules that specify the same currency, and fall back to a rule that specifies your account's default currency. If this parameter is omitted, it will be set to your account's default currency."
            },
            taxExempted: {
              type: "boolean",
              description: "Indicates whether or not the price is tax exempted"
            },
            regularPrice: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "The standard price that would usually be offered for this journey, if dynamic pricing rules were not being used. This data is for reporting purposes and has no effect on the pricing system. This value defaults to 'null'."
            },
            sellStartDate: {
              type: "string",
              format: "date-time",
              description: "An ISO 8601 Datetime with Timezone string (example: \"2018-01-15T14:53:00-05:00\"). 'sellStartDate' and 'sellEndDate' define a time interval. This Journey Pricing Rule will only target purchases that are made sometime between the 'sellStartDate' and 'sellEndDate'. You may also set both this value and 'sellEndDate' to 'null, which will cause the rule to target sales on any date. This value defaults to null"
            },
            sellEndDate: {
              type: "string",
              format: "date-time",
              description: "An ISO 8601 Datetime with Timezone string (example: \"2018-02-10T16:15:00-05:00\"). 'sellStartDate' and 'sellEndDate' define a time interval. This Journey Pricing Rule will only target purchases that are made sometime between the 'sellStartDate' and 'sellEndDate'. You may also set both this value and 'sellStartDate' to 'null, which will cause the rule to target sales on any date. This value defaults to null"
            },
            tripStartDate: {
              type: "string",
              format: "date-time",
              description: "An ISO 8601 Datetime with Timezone string (example: \"2018-01-15T14:53:00-05:00\"). 'tripStartDate' and 'tripEndDate' define a time interval. This Journey Pricing Rule will only target trips that depart sometime between the 'tripStartDate' and 'tripEndDate'. You may also set both this value and 'tripEndDate' to 'null, which will cause the rule to target trips departing on any date. This value defaults to null"
            },
            tripEndDate: {
              type: "string",
              format: "date-time",
              description: "An ISO 8601 Datetime with Timezone string (example: \"2018-02-10T16:15:00-05:00\"). 'tripStartDate' and 'tripEndDate' define a time interval. This Journey Pricing Rule will only target trips that depart sometime between the 'tripStartDate' and 'tripEndDate'. You may also set both this value and 'tripStartDate' to 'null, which will cause the rule to target trips departing on any date. This value defaults to null"
            },
            dow: {
              $ref: "#/definitions/DowJp",
              description: "Days of week for the journey price to be available."
            },
            advancePurchaseFrom: {
              type: "integer",
              format: "int32",
              minimum: 0
            },
            advancePurchaseTo: {
              type: "integer",
              format: "int32",
              minimum: 0
            },
            ticketsPerManifest: {
              type: "integer",
              format: "int32",
              minimum: -1,
              description: "The maximum number of tickets in a single manifest that may be sold with this Journey Pricing Rule. This parameter limits how many passengers travelling on the same trip can purchase their ticket at this price. Set to -1 to indicate that there is no maximum."
            },
            roundTripDiscount: {
              $ref: "#/definitions/PriceAdjustment",
              description: "The price adjustment that is applied when a user purchases a round-trip ticket using this Journey Pricing Rule. NOTE: The returned 'value' is in an internal format, and will not match the value that was provided when the record was created."
            },
            sameDayRoundTripDiscount: {
              $ref: "#/definitions/PriceAdjustment"
            },
            onlyApplyToSchedules: {
              $ref: "#/definitions/ApplyToSchedules",
              description: "The ID or name of all the schedules to which this Journey Pricing Rule is limited. If this value is 'null', this rule will target all schedules configured for your account. Except those defined in neverApplyToSchedules. This value defaults to 'null'."
            },
            neverApplyToSchedules: {
              $ref: "#/definitions/ApplyToSchedules",
              description: "The ID or name of all the schedules to which this Journey Pricing Rule should not be applied. If this value is 'null', this rule will target all schedules configured for your account. Or only to those defined in onlyApplyToSchedules. This value defaults to 'null'."
            },
            channels: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "callcenter",
                  "agency",
                  "websales",
                  "backoffice",
                  "agency-websales",
                  "agency-backoffice"
                ]
              },
              description: "The sales channels that are targeted by this Journey Pricing Rule. Ticket sales that occur through a channel that's not listed here are not allowed to use this price. If this value is 'null', this rule will target all sales channels. This value defaults to 'null'."
            },
            shiftZones: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The shift zones that are targeted by this Journey Pricing Rule If this value is 'null', this rule will target all shift zones. This value defaults to 'null'."
            },
            loyaltyPointsToAccumulate: {
              type: "integer",
              format: "int32",
              minimum: 0,
              description: "The number of loyalty points accumulated when a ticket is purchased using this Journey Pricing Rule"
            },
            loyaltyPointsForRedemption: {
              type: "integer",
              format: "int32",
              minimum: 0,
              description: "The number of loyalty points required to obtain a free ticket for this Journey"
            },
            base: {
              type: "boolean",
              description: "Indicates whether or not this is the base price for travel between this origin and destination. This data is for reporting purposes and has no effect on the pricing system."
            },
            loadFactorFrom: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "'loadFactorFrom' and 'loadFactorTo' define a load factor range. This Journey Pricing Rule will only target purchases where the highest load factor of all vehicles on all legs of the journey is currently greater or equal to 'loadFactorFrom' and less than 'loadFactorTo'. For example, if 'loadFactorFrom' = 0 and 'loadFactorTo' = 22.5, and a trip search is performed, the current load factor of all legs of the journey will be retrieved, and this Journey Pricing Rule will only be applied if the leg with the highest load factor has a load factor between 0% and 22.4999%. You may also set both 'loadFactorFrom' and 'loadFactorTo' to 'null, which will cause the rule to apply to trips with any max. load factor. This value defaults to null"
            },
            loadFactorTo: {
              type: "number",
              format: "float",
              description: "See instructions for 'loadFactorFrom'."
            },
            externalField1: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            },
            externalField2: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            },
            externalField3: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            }
          }
        },
        JourneyPriceUpdateRequest: {
          type: "object",
          properties: {
            productId: {
              type: "string",
              description: "The ID of the Product that is targeted by this Journey Pricing Rule. If this value is 'null', this rule will target any product."
            },
            fareClassIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of all the Fare Classes that are targeted by this Journey Pricing Rule. If this value is 'null', this rule will target all fare classes configured for your account."
            },
            fareIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of all the Fares that are targeted by this Journey Pricing Rule. If this value is 'null', this rule will target all fares."
            },
            amenityGroupIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of all the Amenity Groups that are targeted by this Journey Pricing Rule. If this value is 'null', this rule will target all amenity groups configured for your account."
            },
            brandIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of all the Brands that are targeted by this Journey Pricing Rule. If this value is 'null', this rule will target all brands configured for your account."
            },
            price: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "Trip purchases that match all of the parameters of this Journey Pricing Rule will be assigned this base price."
            },
            openReturnPrice: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "Trip purchases with ticket.type='openreturn' that match all of the parameters of this Journey Pricing Rule will be assigned this base price, if defined, instead of the regular 'price'. You may set this value to 'null'."
            },
            currency: {
              type: "string",
              description: "The currency that the 'price' is specified in. Must be an ISO 4217 currency code. Trip searches that are performed in a particular currency will prefer journey pricing rules that specify the same currency, and fall back to a rule that specifies your account's default currency."
            },
            regularPrice: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "The standard price that would usually be offered for this journey, if dynamic pricing rules were not being used. This data is for reporting purposes and has no effect on the pricing system. You may set this value to 'null'."
            },
            taxExempted: {
              type: "boolean",
              description: "Indicates whether or not the price is tax exempted"
            },
            sellStartDate: {
              type: "string",
              format: "date-time"
            },
            sellEndDate: {
              type: "string",
              format: "date-time"
            },
            tripStartDate: {
              type: "string",
              format: "date-time"
            },
            tripEndDate: {
              type: "string",
              format: "date-time"
            },
            dow: {
              $ref: "#/definitions/DowJp",
              description: "Days of week for the journey price to be available."
            },
            advancePurchaseFrom: {
              type: "integer",
              format: "int32",
              minimum: 0
            },
            advancePurchaseTo: {
              type: "integer",
              format: "int32",
              minimum: 0
            },
            ticketsPerManifest: {
              type: "integer",
              format: "int32",
              minimum: -1,
              description: "The maximum number of tickets in a single manifest that may be sold with this Journey Pricing Rule. This parameter limits how many passengers travelling on the same trip can purchase their ticket at this price. Set to -1 to indicate that there is no maximum."
            },
            roundTripDiscount: {
              $ref: "#/definitions/PriceAdjustment",
              description: "The price adjustment that is applied when a user purchases a round-trip ticket using this Journey Pricing Rule."
            },
            sameDayRoundTripDiscount: {
              $ref: "#/definitions/PriceAdjustment"
            },
            onlyApplyToSchedules: {
              $ref: "#/definitions/ApplyToSchedules",
              description: "The ID or name of all the schedules to which this Journey Pricing Rule is limited. If this value is 'null', this rule will target all schedules configured for your account. Except those defined in neverApplyToSchedules. This value defaults to 'null'."
            },
            neverApplyToSchedules: {
              $ref: "#/definitions/ApplyToSchedules",
              description: "The ID or name of all the schedules to which this Journey Pricing Rule should not be applied. If this value is 'null', this rule will target all schedules configured for your account. Or only to those defined in onlyApplyToSchedules. This value defaults to 'null'."
            },
            channels: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "callcenter",
                  "agency",
                  "websales",
                  "backoffice",
                  "agency-websales",
                  "agency-backoffice"
                ]
              },
              description: "The sales channels that are targeted by this Journey Pricing Rule. Ticket sales that occur through a channel that's not listed here are not allowed to use this price. If this value is 'null', this rule will target all sales channels."
            },
            shiftZones: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The shift zones that are targeted by this Journey Pricing Rule If this value is 'null', this rule will target all shift zones. This value defaults to 'null'."
            },
            loyaltyPointsToAccumulate: {
              type: "integer",
              format: "int32",
              minimum: 0,
              description: "The number of loyalty points accumulated when a ticket is purchased using this Journey Pricing Rule"
            },
            loyaltyPointsForRedemption: {
              type: "integer",
              format: "int32",
              minimum: 0,
              description: "The number of loyalty points required to obtain a free ticket for this Journey"
            },
            base: {
              type: "boolean",
              description: "Indicates whether or not this is the base price for travel between this origin and destination. This data is for reporting purposes and has no effect on the pricing system."
            },
            loadFactorFrom: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "'loadFactorFrom' and 'loadFactorTo' define a load factor range. This Journey Pricing Rule will only target purchases where the highest load factor of all vehicles on all legs of the journey is currently greater or equal to 'loadFactorFrom' and less than 'loadFactorTo'. For example, if 'loadFactorFrom' = 0 and 'loadFactorTo' = 22.5, and a trip search is performed, the current load factor of all legs of the journey will be retrieved, and this Journey Pricing Rule will only be applied if the leg with the highest load factor has a load factor between 0% and 22.4999%. You may also set both 'loadFactorFrom' and 'loadFactorTo' to 'null, which will cause the rule to apply to trips with any max. load factor. This value defaults to null"
            },
            loadFactorTo: {
              type: "number",
              format: "float",
              description: "See instructions for 'loadFactorFrom'."
            },
            externalField1: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            },
            externalField2: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            },
            externalField3: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            }
          }
        },
        JourneyPrice: {
          properties: {
            id: {
              type: "string",
              description: "The ID of this Journey Pricing Rule. This ID remains consistent across updates."
            },
            versionId: {
              type: "string"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            productId: {
              type: "string",
              description: "The ID of the product that is targeted by this Journey Pricing Rule"
            },
            productName: {
              type: "string",
              description: "The name of the product that is targeted by this Journey Pricing Rule"
            },
            fareClassIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of the Fare Classes that are targeted by this Journey Pricing Rule"
            },
            fareClassNames: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The names of the Fare Classes that are targeted by this Journey Pricing Rule"
            },
            fareIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of the Fares that are targeted by this Journey Pricing Rule"
            },
            fareNames: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The names of the Fares that are targeted by this Journey Pricing Rule"
            },
            amenityGroupIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of the Amenity Groups that are targeted by this Journey Pricing Rule"
            },
            amenityGroupNames: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The names of the Amenity Groups that are targeted by this Journey Pricing Rule"
            },
            brandIds: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The IDs of the Brands that are targeted by this Journey Pricing Rule"
            },
            brandNames: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The names of the Brands that are targeted by this Journey Pricing Rule"
            },
            originId: {
              type: "string",
              description: "The ID of the Origin Station that this Journey Pricing Rule applies to"
            },
            originName: {
              type: "string",
              description: "The name of the Origin Station that this Journey Pricing Rule applies to"
            },
            destinationId: {
              type: "string",
              description: "The ID of the Destination Station that this Journey Pricing Rule applies to"
            },
            destinationName: {
              type: "string",
              description: "The name of the Destination Station that this Journey Pricing Rule applies to"
            },
            price: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "Trip purchases that match all of the parameters of this Journey Pricing Rule will be assigned this base price. NOTE: To translate this value into your local currency, divide this value by 100000"
            },
            openReturnPrice: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "Trip purchases with ticket.type='openreturn' that match all of the parameters of this Journey Pricing Rule will be assigned this base price, if defined, instead of the regular 'price'. You may set this value to 'null'. NOTE: To translate this value into your local currency, divide this value by 100000"
            },
            currency: {
              type: "string",
              description: "The currency that the 'price' is specified in. An ISO 4217 currency code. Trip searches that are performed in a particular currency will prefer journey pricing rules that specify the same currency, and fall back to a rule that specifies your account's default currency."
            },
            taxExempted: {
              type: "boolean",
              description: "Indicates whether or not the price is tax exempted"
            },
            regularPrice: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "The standard price that would usually be offered for this journey, if dynamic pricing rules were not being used. This data is for reporting purposes and has no effect on the pricing system. This value defaults to 'null'. NOTE: To translate this value into your local currency, divide this value by 100000"
            },
            sellStartDate: {
              type: "string",
              format: "date-time"
            },
            sellEndDate: {
              type: "string",
              format: "date-time"
            },
            tripStartDate: {
              type: "string",
              format: "date-time"
            },
            tripEndDate: {
              type: "string",
              format: "date-time"
            },
            dow: {
              $ref: "#/definitions/DowJp",
              description: "Days of week for the journey price to be available."
            },
            advancePurchaseFrom: {
              type: "integer",
              format: "int32",
              minimum: 0
            },
            advancePurchaseTo: {
              type: "integer",
              format: "int32",
              minimum: 0
            },
            ticketsPerManifest: {
              type: "integer",
              format: "int32",
              minimum: -1,
              description: "The maximum number of tickets in a single manifest that may be sold with this Journey Pricing Rule. This parameter limits how many passengers travelling on the same trip can purchase their ticket at this price. Set to -1 to indicate that there is no maximum."
            },
            roundTripDiscount: {
              $ref: "#/definitions/PriceAdjustment",
              description: "The price adjustment that is applied when a user purchases a round-trip ticket using this Journey Pricing Rule."
            },
            onlyApplyToSchedules: {
              $ref: "#/definitions/ApplyToSchedules",
              description: "The ID or name of all the schedules to which this Journey Pricing Rule is limited. If this value is 'null', this rule will target all schedules configured for your account. Except those defined in neverApplyToSchedules. This value defaults to 'null'."
            },
            neverApplyToSchedules: {
              $ref: "#/definitions/ApplyToSchedules",
              description: "The ID or name of all the schedules to which this Journey Pricing Rule should not be applied. If this value is 'null', this rule will target all schedules configured for your account. Or only to those defined in onlyApplyToSchedules. This value defaults to 'null'."
            },
            sameDayRoundTripDiscount: {
              $ref: "#/definitions/PriceAdjustment"
            },
            channels: {
              type: "array",
              items: {
                type: "string",
                enum: [
                  "callcenter",
                  "agency",
                  "websales",
                  "backoffice",
                  "agency-websales",
                  "agency-backoffice"
                ]
              },
              description: "The sales channels that are targeted by this Journey Pricing Rule. Ticket sales that occur through a channel that's not listed here are not allowed to use this price."
            },
            loyaltyPointsToAccumulate: {
              type: "integer",
              format: "int32",
              minimum: 0,
              description: "The number of loyalty points accumulated when a ticket is purchased using this Journey Pricing Rule"
            },
            loyaltyPointsForRedemption: {
              type: "integer",
              format: "int32",
              minimum: 0,
              description: "The number of loyalty points required to obtain a free ticket for this Journey"
            },
            base: {
              type: "boolean",
              description: "Indicates whether or not this is the base price for travel between this origin and destination. This data is for reporting purposes and has no effect on the pricing system."
            },
            loadFactorFrom: {
              type: "number",
              format: "float",
              minimum: 0,
              description: "'loadFactorFrom' and 'loadFactorTo' define a load factor range. This Journey Pricing Rule will only target purchases where the highest load factor of all vehicles on all legs of the journey is currently greater or equal to 'loadFactorFrom' and less than 'loadFactorTo'. For example, if 'loadFactorFrom' = 0 and 'loadFactorTo' = 22.5, and a trip search is performed, the current load factor of all legs of the journey will be retrieved, and this Journey Pricing Rule will only be applied if the leg with the highest load factor has a load factor between 0% and 22.4999%. You may also set both 'loadFactorFrom' and 'loadFactorTo' to 'null, which will cause the rule to apply to trips with any max. load factor. This value defaults to null"
            },
            loadFactorTo: {
              type: "number",
              format: "float",
              description: "See instructions for 'loadFactorFrom'."
            },
            externalField1: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            },
            externalField2: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            },
            externalField3: {
              type: "string",
              description: "Free text field used for rules grouping/tagging"
            },
            disabled: {
              type: "boolean",
              description: "Determines if this Journey Pricing Rule is marked as disabled. Disabled rules will never be applied to any new purchases."
            },
            deleted: {
              type: "boolean",
              description: "Determines if this Journey Pricing Rule is marked as deleted. Deleted rules will never be applied to any new purchases."
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "The time at which this Journey Pricing Rule was created"
            },
            createdBy: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            createdByUserEmail: {
              type: "string",
              description: "The email of the user that created it"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "The time at which this Journey Pricing Rule was last updated"
            },
            updatedBy: {
              type: "string",
              description: "The ID of the user who last updated this Journey Pricing Rule"
            },
            updatedByUserEmail: {
              type: "string",
              description: "The email of the user who last updated this Journey Pricing Rule"
            }
          },
          type: "object"
        },
        JourneyPrices: {
          properties: {
            journeyPrices: {
              type: "array",
              items: {
                $ref: "#/definitions/JourneyPrice"
              }
            },
            next: {
              type: "string",
              description: "A URL pointing to the next page of results. If no more results are available, this will be an empty string."
            },
            previous: {
              type: "string",
              description: "A URL pointing to the previous page of results. If no previous results are available (ie. you are already viewing the first page of results), this will be an empty string."
            },
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of results returned by your query, across all pages."
            }
          },
          type: "object"
        },
        ApplyToSchedules: {
          type: "object",
          properties: {
            and: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The ID or name of the schedules to which this Journey Pricing Rule will be targeted. Every schedule of a trip must be defined in the AND key for the rule to be applied."
            },
            or: {
              type: "array",
              items: {
                type: "string"
              },
              description: "The ID or name of the schedules to which this Journey Pricing Rule will be targeted. At least one of the schedules defined in the OR key must match a trip to be applied."
            }
          }
        },
        DowJp: {
          type: "object",
          properties: {
            monday: {
              type: "boolean",
              description: "This journey price is available on Mondays"
            },
            tuesday: {
              type: "boolean",
              description: "This journey price is available on Tuesdays"
            },
            wednesday: {
              type: "boolean",
              description: "This journey price is available on Wednesdays"
            },
            thursday: {
              type: "boolean",
              description: "This journey price is available on Thursdays"
            },
            friday: {
              type: "boolean",
              description: "This journey price is available on Fridays"
            },
            saturday: {
              type: "boolean",
              description: "This journey price is available on Saturdays"
            },
            sunday: {
              type: "boolean",
              description: "This journey price is available on Sundays"
            }
          }
        },
        PriceAdjustment: {
          type: "object",
          required: [
            "type",
            "value"
          ],
          properties: {
            type: {
              type: "string",
              enum: [
                "$",
                "%",
                "override"
              ]
            },
            value: {
              type: "number"
            }
          }
        },
        Dimensions: {
          type: "object",
          properties: {
            height: {
              $ref: "#/definitions/Dimension"
            },
            width: {
              $ref: "#/definitions/Dimension"
            },
            length: {
              $ref: "#/definitions/Dimension"
            },
            weight: {
              $ref: "#/definitions/Dimension"
            }
          }
        },
        Dimension: {
          properties: {
            value: {
              type: "number",
              format: "float"
            },
            unit: {
              type: "string"
            }
          },
          type: "object"
        },
        FareLexiconKeys: {
          type: "object",
          description: "Lexicon keys for fares",
          properties: {
            name: {
              type: "string",
              description: "The key to the fare's name"
            },
            description: {
              type: "string",
              description: "The key to the fare's description."
            },
            requiresCompanionErrMsg: {
              type: "string",
              description: "The key to the error message that is displayed when a Fare requires a companion, and none exists."
            },
            extraUserInputLabel: {
              type: "string",
              description: "The key to the fare's extra user input label"
            },
            extraUserInputHint: {
              type: "string",
              description: "The key to the fare's extra user input hint"
            }
          }
        },
        FareClassLexiconKeys: {
          type: "object",
          description: "Lexicon keys for fare classes",
          properties: {
            name: {
              type: "string",
              description: "The key to the fare class' name."
            },
            description: {
              type: "string",
              description: "The key to the fare class' description."
            },
            terms: {
              type: "string",
              description: "The key to the fare class' terms and conditions."
            }
          }
        },
        FareClassLexiconKeysUpdate: {
          type: "object",
          description: "Updated lexicon keys for the Fare Class. This property is optional. If this property is provided, you must specify at least one new lexicon key (you may not provide an empty object)",
          properties: {
            name: {
              type: "string",
              description: "The updated key to the Fare Class' localized name."
            },
            description: {
              type: "string",
              description: "The updated key to the Fare Class' localized description."
            },
            terms: {
              type: "string",
              description: "The updated key to the Fare Class' localized terms and conditions."
            }
          }
        },
        AdjustmentsOverride: {
          type: "object",
          required: [
            "productId",
            "from",
            "fromId",
            "to",
            "toId",
            "adjustmentType"
          ],
          properties: {
            id: {
              type: "string"
            },
            productId: {
              type: "string"
            },
            from: {
              type: "string"
            },
            fromId: {
              type: "string"
            },
            to: {
              type: "string"
            },
            toId: {
              type: "string"
            },
            adjustmentType: {
              type: "string"
            },
            adjustment: {
              type: "integer",
              format: "int32"
            },
            adjustmentToDisplay: {
              type: "string"
            }
          }
        },
        Ssrs: {
          properties: {
            ssrs: {
              type: "array",
              items: {
                $ref: "#/definitions/Ssr"
              }
            }
          },
          type: "object"
        },
        Ssr: {
          required: [
            "accountId",
            "code",
            "name",
            "cutoffTime",
            "fee",
            "feeType",
            "mandatoryField",
            "needsQuantity",
            "maxWithoutCharge",
            "unitDescription",
            "disabled",
            "deleted",
            "type"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the ssr"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            code: {
              type: "string",
              description: "The code of the ssr"
            },
            name: {
              type: "string",
              description: "The name of the ssr"
            },
            description: {
              type: "string",
              description: "A description for the ssr"
            },
            cutoffTime: {
              type: "integer",
              format: "int32"
            },
            fee: {
              type: "integer",
              format: "int32"
            },
            feeType: {
              type: "string"
            },
            capacityImpact: {
              type: "string",
              description: "The capacity impact this ssr will have in the trip/manifest"
            },
            productTypes: {
              type: "array",
              items: {
                type: "string"
              }
            },
            productIds: {
              type: "array",
              items: {
                type: "string"
              }
            },
            oneTrip: {
              type: "boolean",
              description: "Apply to only one trip in a roundtrip"
            },
            mandatoryField: {
              type: "boolean",
              description: "Does the user needs to opt in or out specifically"
            },
            needsQuantity: {
              type: "boolean"
            },
            maxWithoutCharge: {
              type: "integer",
              format: "int32",
              description: "Maximun number of this ssr that will have no charge to the user (when ssr needs qty)"
            },
            maxQty: {
              description: "The maximun possible qty of this ssr if SSR needs quantity",
              type: "integer",
              format: "int32"
            },
            toc: {
              type: "string",
              description: "The terms and conditions or help information for a printable ssr"
            },
            printable: {
              type: "boolean",
              description: "If this ssr will be printed with the ticket"
            },
            printInTicket: {
              type: "boolean",
              description: "If this ssr detail will be printed in the the ticket"
            },
            printInManifest: {
              type: "boolean",
              description: "If this ssr detail will be printed in the manifest"
            },
            unitDescription: {
              type: "string",
              description: "The description for the unit"
            },
            type: {
              type: "string"
            },
            textLabel: {
              type: "string",
              description: "The label for free text input when the ssr is type text"
            },
            disabled: {
              type: "boolean"
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            lexiconKeys: {
              $ref: "#/definitions/SsrLexiconKeys"
            },
            displayIn5dayOutlook: {
              type: "boolean",
              description: "If selected the icon for the SSR will be shown in the 5 day outlook manifest card"
            },
            icon: {
              type: "string",
              description: "The font-awesome class for the icon to show for this SSR"
            }
          },
          type: "object"
        },
        SsrLexiconKeys: {
          description: "Lexicon keys for ssrs",
          properties: {
            name: {
              type: "string"
            },
            description: {
              type: "string"
            },
            toc: {
              type: "string"
            },
            unitDescription: {
              type: "string"
            },
            pluralUnitDescription: {
              type: "string"
            },
            emptyUnitDescription: {
              type: "string"
            },
            textLabel: {
              type: "string"
            }
          },
          type: "object"
        },
        Stations: {
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of stations"
            },
            previous: {
              type: "string",
              description: "The link to the previous page"
            },
            next: {
              type: "string",
              description: "The link to the next page"
            },
            stations: {
              type: "array",
              description: "The stations for the current page",
              items: {
                $ref: "#/definitions/Station"
              }
            }
          },
          type: "object"
        },
        Station: {
          type: "object",
          required: [
            "name",
            "accountId",
            "userId",
            "province",
            "zone"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            name: {
              type: "string",
              description: "The name for the station"
            },
            province: {
              type: "string",
              description: "The province/state where the station is located"
            },
            details: {
              type: "string",
              description: "Extra information for the station that will be printed in the pdf ticket"
            },
            type: {
              description: "Default to null for most stations",
              $ref: "#/definitions/StationType"
            },
            zone: {
              type: "string",
              description: "A string identifier that is used to group stations together, usually for a business reason"
            },
            latitude: {
              type: "string",
              description: "Latitude of the station"
            },
            longitude: {
              type: "string",
              description: "Longitude of the station"
            },
            timeZoneDiff: {
              type: "string",
              description: "Deprecated. Do not use. See the 'timeZone' parameter instead."
            },
            timeZone: {
              type: "string",
              description: "TimeZone that corresponds to the station, one of IANA time zone identifiers or null"
            },
            disabled: {
              type: "boolean",
              description: "Indicates if the station is disabled, a disabled station can't be added to new routes"
            },
            deleted: {
              type: "boolean",
              description: "Indicates if the station was logically deleted"
            },
            ord: {
              type: "integer",
              format: "int32",
              description: "Used to sort stations, by default stations are sorted alphabetically, if this value is entered stations will be sorted by this value first and alphabetically in second place."
            },
            excludeFromConnex: {
              type: "boolean",
              description: "If the station can be used as a connecting point"
            },
            terminals: {
              type: "array",
              description: "If the 'type' is Airport, at least one terminal is required",
              items: {
                $ref: "#/definitions/Terminal"
              }
            },
            airlines: {
              type: "array",
              description: "If the 'type' is Airport, at least one airline per terminal is required",
              items: {
                $ref: "#/definitions/Airline"
              }
            },
            zip: {
              type: "string",
              description: "Postal code of station, used to calculate distance for parcel if price scheme is Postal Code"
            },
            canSend: {
              type: "boolean",
              description: "Used by parcel products to know if the station can send parcels"
            },
            canReceive: {
              type: "boolean",
              description: "Used by parcel products to know if the station can receive parcels"
            },
            isBorder: {
              type: "boolean",
              description: "Represents if the station is a defined as border station or interior"
            },
            country: {
              type: "string",
              description: "The ISO code of the country where the station is located"
            },
            displayedCurrencies: {
              type: "array",
              description: "If the account is multi-currency, we indicate the currency to display when this station is a location for a point of sale",
              items: {
                type: "string"
              }
            },
            primaryCurrencyCode: {
              type: "string",
              description: "The main currency for stations in multi-currency accounts"
            },
            alternativeNames: {
              type: "array",
              items: {
                $ref: "#/definitions/StationAlternativeName"
              }
            },
            connex: {
              description: "The connex overrides for the station",
              $ref: "#/definitions/StationConnexOverrides"
            },
            stationsGroupedWithThisStation: {
              type: "array",
              description: "This array contains stations IDs grouped by the current station",
              items: {
                type: "string"
              }
            },
            stationsInGroupAreBoarding: {
              type: "boolean",
              description: "Indicates if the stations in the group will be printed in the ticket"
            }
          }
        },
        StationType: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "One of 'home_pickup' or 'airport'"
            },
            code: {
              type: "string",
              description: "DEPRECATED - The code for the station type"
            }
          }
        },
        StationTypes: {
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/definitions/StationType"
              }
            }
          },
          type: "object"
        },
        StationAlternativeName: {
          type: "object",
          properties: {
            id: {
              type: "string",
              description: "A valid uuid version 4 string"
            },
            name: {
              type: "string",
              description: "The alternative station name, that can be used in the schedules"
            },
            deleted: {
              type: "string",
              description: "Allow soft deletion of the alternative name.Must be a valid ISO Date string to mark as deleted. Default: null"
            }
          }
        },
        PostalCode: {
          properties: {
            id: {
              type: "string"
            },
            accountId: {
              type: "string"
            },
            postalCode: {
              type: "string"
            },
            fsa: {
              type: "string"
            },
            fsa1: {
              type: "string"
            },
            fsaProvince: {
              type: "integer"
            },
            latitude: {
              type: "number",
              format: "double"
            },
            longitude: {
              type: "number",
              format: "double"
            },
            placeName: {
              type: "string"
            },
            areaType: {
              type: "string"
            },
            deleted: {
              type: "boolean"
            }
          },
          type: "object"
        },
        Route: {
          required: [
            "_id",
            "name",
            "accountId"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            name: {
              type: "string",
              description: "The name of the route"
            },
            stops: {
              type: "array",
              description: "The stops names in this route",
              items: {
                type: "string"
              }
            },
            stopsIds: {
              type: "array",
              description: "The IDs of the stops in this route",
              items: {
                type: "string"
              }
            },
            schedules: {
              type: "array",
              description: "An array of schedules defined for this route",
              items: {
                $ref: "#/definitions/ScheduleInRoute"
              }
            },
            productType: {
              type: "string",
              description: "Deprecated"
            },
            productIds: {
              type: "array",
              description: "Ids of the products associated to this route",
              items: {
                type: "string"
              }
            },
            buckets: {
              type: "array",
              description: "An array of price buckets for this route for revenue management when using Pont to Point prices.",
              items: {
                type: "object"
              }
            },
            fareRules: {
              type: "array",
              description: "An array of fare rules for this route for revenue management when using Pont to Point prices.",
              items: {
                type: "object"
              }
            },
            faresByProduct: {
              type: "array",
              description: "An array of FareByProducts with fares (or distances) for point to point trips on the stops in this route",
              items: {
                $ref: "#/definitions/FareByProduct"
              }
            },
            crossBorderDistances: {
              type: "object",
              description: "(Only available when cross border taxation feature is enabled) Keys are stations, values are objects where the keys are the possible destinations from the key on the main object, values in the second object are the distances."
            },
            disabled: {
              type: "boolean",
              description: "This route is disabled and schedules in this route will not be available for new bookings"
            },
            deleted: {
              type: "boolean",
              description: "This route was soft-deleted and it can be ignored, kept for historical purposes only."
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          type: "object"
        },
        ScheduleInRoute: {
          properties: {
            ord: {
              type: "string",
              description: "Deprecated"
            },
            name: {
              type: "string",
              description: "The internal Id for the schedule"
            },
            displayName: {
              type: "string",
              description: " The name of the schedule"
            },
            time: {
              type: "string",
              description: "The start time for the schedule in HH:MM 24 hrs format"
            },
            fromDate: {
              type: "string",
              description: "The first date this schedule will be available, mm/dd/yyyy format"
            },
            toDate: {
              type: "string",
              description: "The last date this schedule will be available, mm/dd/yyyy format"
            },
            dow: {
              $ref: "#/definitions/Dow"
            },
            capacity: {
              type: "integer",
              format: "int32",
              description: "The total capacity for the schedule"
            },
            legs: {
              type: "array",
              description: "A list of legs for this schedule",
              items: {
                $ref: "#/definitions/Leg"
              }
            },
            from: {
              type: "string",
              description: "The name of the first station in the schedule"
            },
            to: {
              type: "string",
              description: "The name of the last station in the schedule"
            },
            fromId: {
              type: "string",
              description: "The id of the first station in the schedule"
            },
            toId: {
              type: "string",
              description: "The id of the last station in the schedule"
            },
            brandId: {
              type: "string",
              description: "The id of the brand associated to the schedule (if available)"
            },
            brandName: {
              type: "string",
              description: "The name of the brand associated to the schedule (if available)"
            },
            operatingCompanyId: {
              type: "string",
              description: "The operating company Id (if available)"
            },
            operatingCompanyName: {
              type: "string",
              description: "The operating company name (if available)"
            },
            operatingCompanyInfoOnPrintedTicket: {
              type: "string",
              description: "The operating company information to print in the ticket (if available)"
            },
            inventoryId: {
              type: "string",
              description: "The id of the inventory item for this schedule (if available)"
            },
            seatMapId: {
              type: "string",
              description: "The id of the seatmap configuration for this schedule (if available)"
            },
            amenityGroupIds: {
              type: "array",
              description: "List of ids of the amenity groups associated to this schedule (if available)",
              items: {
                type: "string"
              }
            }
          },
          type: "object"
        },
        ScheduleUpdateData: {
          required: [
            "jwtToken",
            "providerId",
            "userId",
            "schedule"
          ],
          properties: {
            jwtToken: {
              type: "string",
              description: "The JWT for this request"
            },
            providerId: {
              type: "string",
              description: "The provider ID for this request"
            },
            userId: {
              type: "string",
              description: "The user ID for this request"
            },
            schedule: {
              $ref: "#/definitions/Schedule"
            }
          },
          type: "object"
        },
        PatchScheduleResult: {
          properties: {
            updatedExisting: {
              type: "boolean"
            },
            scheduleId: {
              type: "string",
              description: "The id of the modified or new schedule, if updatedExisting is true, this will be the same id as the request",
              example: "a1c13261-9a4b-4568-a69a-0c8ee7059e92"
            },
            status: {
              type: "string",
              description: "If we have been able to complete the update",
              enum: [
                "success",
                "error"
              ]
            }
          },
          type: "object"
        },
        Schedule: {
          properties: {
            name: {
              type: "string"
            },
            displayName: {
              type: "string"
            },
            time: {
              type: "string"
            },
            fromDate: {
              type: "string",
              description: "The first date this schedule will be available, mm/dd/yyyy format"
            },
            toDate: {
              type: "string",
              description: "The last date this schedule will be available, mm/dd/yyyy format"
            },
            dow: {
              $ref: "#/definitions/Dow"
            },
            capacity: {
              type: "integer",
              format: "int32"
            },
            legs: {
              type: "array",
              items: {
                $ref: "#/definitions/Leg"
              }
            },
            from: {
              type: "string"
            },
            fromId: {
              type: "string",
              description: "The origin Id for the schedule",
              pattern: "^[0-9a-f]{24}$"
            },
            to: {
              type: "string"
            },
            toId: {
              type: "string",
              description: "The destination Id for the schedule",
              pattern: "^[0-9a-f]{24}$"
            },
            inventoryId: {
              type: "string",
              description: "The inventory Id for the schedule",
              pattern: "^[0-9a-f]{24}$"
            },
            seatMapId: {
              type: "string",
              description: "The seatmap Id for the schedule",
              pattern: "^[0-9a-f]{24}$"
            }
          },
          type: "object"
        },
        Dow: {
          description: "Days of week for the schedule to run, also indicates if it runs on holidays.",
          required: [
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday",
            "holidaysIncluded",
            "holidaysOnly"
          ],
          properties: {
            monday: {
              type: "string",
              description: "The schedule runs on Mondays",
              enum: [
                "Y",
                "N"
              ]
            },
            tuesday: {
              type: "string",
              description: "The schedule runs on Tuesdays",
              enum: [
                "Y",
                "N"
              ]
            },
            wednesday: {
              type: "string",
              description: "The schedule runs on Wednesday",
              enum: [
                "Y",
                "N"
              ]
            },
            thursday: {
              type: "string",
              description: "The schedule runs on Thursdays",
              enum: [
                "Y",
                "N"
              ]
            },
            friday: {
              type: "string",
              description: "The schedule runs on Fridays",
              enum: [
                "Y",
                "N"
              ]
            },
            saturday: {
              type: "string",
              description: "The schedule runs on Saturdays",
              enum: [
                "Y",
                "N"
              ]
            },
            sunday: {
              type: "string",
              description: "The schedule runs on Sundays",
              enum: [
                "Y",
                "N"
              ]
            },
            holidaysIncluded: {
              type: "string",
              description: "The schedule runs also during holidays",
              enum: [
                "Y",
                "N"
              ]
            },
            holidaysOnly: {
              type: "string",
              description: "The schedule runs only during holidays",
              enum: [
                "Y",
                "N"
              ]
            }
          },
          type: "object"
        },
        Leg: {
          properties: {
            legord: {
              type: "integer",
              format: "int32",
              description: "The position of the leg in the schedule"
            },
            from: {
              type: "string",
              description: "The name of the departure station"
            },
            to: {
              type: "string",
              description: "The name of the arrival station"
            },
            departure: {
              type: "string",
              description: "The departure time from the departure station in HH:MM 24 hrs format"
            },
            arrival: {
              type: "string",
              description: "The arrival time from the arrival station in HH:MM 24 hrs format"
            },
            fromId: {
              type: "string",
              description: "The id for the departure station"
            },
            toId: {
              type: "string",
              description: "The id for the arrival station"
            },
            fromNameId: {
              type: "string",
              description: "The ID of the departure station alternative name (if available)"
            },
            toNameId: {
              type: "string",
              description: "The ID of the arrival station alternative name (if available)"
            }
          },
          type: "object"
        },
        Terminal: {
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            }
          },
          type: "object"
        },
        Airline: {
          properties: {
            id: {
              type: "string"
            },
            terminalId: {
              type: "string"
            },
            name: {
              type: "string"
            }
          },
          type: "object"
        },
        FareByProduct: {
          required: [
            "productId",
            "fares"
          ],
          properties: {
            productId: {
              type: "string"
            },
            fares: {
              type: "object",
              description: "Keys on the product are stations, values are objects where the keys are the possible destinations from the key on the main object, values in the second object are the prices.Prices need to be divided by 100000 to get the value in the account currency."
            }
          },
          type: "object"
        },
        Promos: {
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of promos"
            },
            previous: {
              type: "string",
              description: "The link to the previous page"
            },
            next: {
              type: "string",
              description: "The link to the next page"
            },
            promos: {
              type: "array",
              description: "The promos for the current page",
              items: {
                $ref: "#/definitions/Promo"
              }
            }
          },
          type: "object"
        },
        Promo: {
          required: [
            "name",
            "internalId"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            campaign: {
              type: "string"
            },
            internalId: {
              type: "string",
              description: "The shown id of the promo"
            },
            name: {
              type: "string",
              description: "The name of the promo"
            },
            rules: {
              type: "array",
              items: {
                $ref: "#/definitions/PromoRule"
              }
            },
            valueType: {
              type: "string"
            },
            value: {
              type: "integer",
              format: "int32"
            },
            from: {
              type: "string"
            },
            to: {
              type: "string"
            },
            fare: {
              type: "string"
            },
            appliesOnlyWhenLoggedIn: {
              type: "boolean"
            },
            productType: {
              type: "string"
            },
            productId: {
              type: "string"
            },
            validPeriod: {
              type: "object",
              items: {
                $ref: "#/definitions/ValidPeriod"
              }
            },
            qty: {
              type: "integer",
              format: "int32"
            },
            available: {
              type: "integer",
              format: "int32"
            },
            disabled: {
              type: "boolean"
            },
            deleted: {
              type: "boolean"
            },
            createdBy: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            updatedBy: {
              type: "string",
              description: "The unique identifier for the user that last updated it"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            createdByUserEmail: {
              type: "string",
              description: "The email for the user that created it"
            },
            updatedByUserEmail: {
              type: "string",
              description: "The email for the user that last updated it"
            }
          },
          type: "object"
        },
        PromoCreateRequest: {
          properties: {
            promo: {
              $ref: "#/definitions/PromoUpdateRequest"
            }
          },
          type: "object"
        },
        PromoUpdateRequest: {
          properties: {
            internalId: {
              type: "string"
            },
            campaign: {
              type: "string"
            },
            name: {
              type: "string"
            },
            disabled: {
              type: "boolean"
            }
          },
          type: "object"
        },
        Fees: {
          properties: {
            fees: {
              type: "array",
              items: {
                $ref: "#/definitions/Fee"
              }
            }
          },
          type: "object"
        },
        Fee: {
          required: [
            "_id",
            "accountId",
            "name",
            "internalId",
            "valueType",
            "value"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            internalId: {
              type: "string",
              description: "The shown id of the fee"
            },
            name: {
              type: "string",
              description: "The name of the fee"
            },
            valueType: {
              type: "string"
            },
            value: {
              type: "integer",
              format: "int32"
            },
            rules: {
              type: "object"
            },
            fareClassId: {
              type: "string",
              description: "The Id of the fare class associated to the change or cancel rule"
            },
            products: {
              type: "object"
            },
            taxable: {
              type: "boolean"
            },
            isRefundable: {
              type: "boolean"
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            lexiconKeys: {
              type: "object"
            }
          },
          type: "object"
        },
        ValidPeriod: {
          properties: {
            from: {
              type: "string"
            },
            to: {
              type: "string"
            }
          },
          type: "object"
        },
        PromoRuleCreateRequest: {
          properties: {
            rule: {
              $ref: "#/definitions/PromoRule"
            }
          },
          type: "object"
        },
        PromoRule: {
          properties: {
            ruleId: {
              type: "string",
              description: "The unique identifier"
            },
            internalId: {
              type: "string",
              description: "The shown id of the promo"
            },
            valueType: {
              type: "string"
            },
            value: {
              type: "integer",
              format: "int32",
              description: "The number passed should be multiplied by 100000 for $ and 1000 for %. i.e. if you want to pass $22.00 you have to set 2200000 and if you want to pass %22.00 you have to set 22000"
            },
            origin: {
              type: "string",
              description: "The name of the origin station"
            },
            destination: {
              type: "string",
              description: "The name of the destination station"
            },
            fare: {
              type: "string",
              description: "The name of the fare"
            },
            appliesOnlyWhenLoggedIn: {
              type: "boolean"
            },
            productType: {
              type: "string"
            },
            validPeriod: {
              $ref: "#/definitions/RuleValidPeriod"
            },
            qty: {
              type: "integer",
              format: "int32"
            },
            available: {
              type: "integer",
              format: "int32"
            },
            unlimited: {
              type: "boolean"
            },
            validChannels: {
              $ref: "#/definitions/RuleValidChannels"
            },
            amenityGroupId: {
              type: "string",
              description: "The id of the amenity group"
            }
          },
          type: "object"
        },
        RuleValidChannels: {
          properties: {
            backoffice: {
              type: "boolean"
            },
            agencyBackoffice: {
              type: "boolean"
            },
            websales: {
              type: "boolean"
            },
            agencyWebsales: {
              type: "boolean"
            }
          },
          type: "object"
        },
        RuleValidPeriodDate: {
          properties: {
            value: {
              type: "string"
            },
            offset: {
              type: "integer",
              format: "int32"
            }
          },
          type: "object"
        },
        RuleValidPeriod: {
          properties: {
            from: {
              $ref: "#/definitions/RuleValidPeriodDate"
            },
            to: {
              $ref: "#/definitions/RuleValidPeriodDate"
            }
          },
          type: "object"
        },
        Account: {
          required: [
            "_id",
            "name"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the object"
            },
            domain: {
              type: "string"
            },
            name: {
              type: "string"
            },
            preferences: {
              type: "object"
            },
            roles: {
              type: "array",
              items: {
                type: "object"
              }
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          type: "object"
        },
        Network: {
          required: [
            "_id",
            "accountId",
            "userId",
            "disabled",
            "deleted"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the object"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            providerId: {
              type: "string",
              description: "The unique identifier of the provider for this network relation"
            },
            providerName: {
              type: "string",
              description: "The display name of the provider in the network list of this seller"
            },
            sellerId: {
              type: "string",
              description: "The unique identifier of the seller account"
            },
            sellerName: {
              type: "string",
              description: "The name of the seller to be shown in the provider sellers lists"
            },
            value: {
              type: "integer",
              format: "int32",
              description: "A percentage value for the commission, (multiplied by 1000), ex: 20% should be entered as 20000"
            },
            valueType: {
              type: "string",
              description: "The type of value '%'"
            },
            globalSearch: {
              type: "boolean",
              description: "Indicates if the seller can access data create by other sellers of this provider"
            },
            products: {
              type: "array",
              description: "A list of products from the provide that this seller can sell",
              items: {
                type: "object"
              }
            },
            disabled: {
              type: "boolean",
              description: "Indicate if this relation is disabled"
            },
            paymentProviders: {
              type: "array",
              description: "List of payment providers from the 'provider' that the seller can use to pay for products",
              items: {
                type: "object"
              }
            },
            paymentSettings: {
              type: "object"
            },
            deleted: {
              type: "boolean",
              description: "Indicates if this object was logically deleted."
            },
            active: {
              type: "boolean",
              description: "Indicate if this relation is active"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          type: "object"
        },
        Holiday: {
          required: [
            "_id",
            "name",
            "accountId"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the object"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The name of the holiday"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            date: {
              type: "string",
              format: "date-time"
            },
            day: {
              type: "integer",
              format: "int32"
            },
            month: {
              type: "integer",
              format: "int32"
            },
            year: {
              type: "integer",
              format: "int32"
            },
            blackout: {
              type: "boolean",
              description: "A black-out date will block any sell"
            },
            recurring: {
              type: "boolean",
              description: "If set as recurring this 'holiday' will apply each year in the same day and month"
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          type: "object"
        },
        Manifest: {
          required: [
            "_id",
            "accountId",
            "routeId",
            "schedule",
            "date"
          ],
          properties: {
            _id: {
              type: "string",
              description: "Unique identifier for the manifest"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            productId: {
              type: "string",
              description: "Associated product ID for the manifest"
            },
            routeId: {
              type: "string",
              description: "Associated route ID"
            },
            seatMapId: {
              type: "string",
              description: "Associated seatmap ID"
            },
            schedule: {
              type: "string",
              description: "Schedule internal name"
            },
            scheduleDisplayName: {
              type: "string",
              description: "Schedule display name"
            },
            capacity: {
              type: "integer",
              format: "int32",
              description: "Total available capacity for the manifest"
            },
            capacityExceptions: {
              type: "array",
              items: {
                type: "object"
              },
              description: "Capacity exceptions for the manifest"
            },
            capacityNotifSent: {
              type: "boolean",
              description: "Whether a capacity notification was sent or not"
            },
            maxLegSsrLoads: {
              type: "object",
              description: "Max special service request load"
            },
            date: {
              type: "string",
              format: "date-time",
              description: "Date for the manifest"
            },
            time: {
              type: "string",
              description: "Time for the manifest"
            },
            legs: {
              type: "array",
              items: {
                type: "object"
              },
              description: "All the legs for the manifest"
            },
            status: {
              type: "string",
              description: "Status for the manifest, ex: 'open'"
            },
            comments: {
              type: "string",
              description: "User added comments for the manifest"
            },
            deleted: {
              type: "boolean",
              description: "Indicates if the manifest was deleted"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Manifest created datetime"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Manifest last updated datetime"
            }
          },
          type: "object"
        },
        Events: {
          properties: {
            events: {
              type: "array",
              items: {
                $ref: "#/definitions/Event"
              }
            }
          },
          type: "object"
        },
        EventSchedule: {
          required: [
            "id",
            "from",
            "to",
            "dow",
            "times",
            "capacity"
          ],
          properties: {
            id: {
              type: "string"
            },
            from: {
              $ref: "#/definitions/BzDate"
            },
            to: {
              $ref: "#/definitions/BzDate"
            },
            dow: {
              $ref: "#/definitions/Dow"
            },
            times: {
              type: "string"
            },
            capacity: {
              type: "string"
            }
          },
          type: "object"
        },
        EventPrice: {
          properties: {
            seatMapId: {
              type: "string"
            },
            pricesList: {
              type: "array",
              items: {
                $ref: "#/definitions/EventPriceList"
              }
            }
          },
          type: "object"
        },
        EventPriceList: {
          required: [
            "id",
            "name",
            "from",
            "to",
            "value"
          ],
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            description: {
              type: "string"
            },
            from: {
              $ref: "#/definitions/BzDate"
            },
            to: {
              $ref: "#/definitions/BzDate"
            },
            min: {
              type: "string"
            },
            max: {
              type: "string"
            },
            value: {
              type: "integer",
              format: "int32"
            },
            order: {
              type: "string"
            },
            ticketsQty: {
              type: "string"
            },
            section: {
              type: "string"
            },
            schedules: {
              type: "array",
              items: {
                type: "string"
              }
            },
            channel: {
              type: "array",
              items: {
                type: "string"
              }
            }
          },
          type: "object"
        },
        EventAncillaryRevenue: {
          required: [
            "id",
            "name",
            "unlimited",
            "qty"
          ],
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            description: {
              type: "string"
            },
            unlimited: {
              type: "boolean"
            },
            qty: {
              type: "integer",
              format: "int32"
            },
            itemsPerFare: {
              type: "array",
              items: {
                $ref: "#/definitions/EventAncillaryRevenueItemsPerFare"
              }
            }
          },
          type: "object"
        },
        EventAncillaryRevenueItemsPerFare: {
          required: [
            "paidItemId"
          ],
          properties: {
            paidItemId: {
              type: "string"
            },
            fares: {
              type: "array",
              items: {
                $ref: "#/definitions/EventAncillaryRevenueItemsPerFareFares"
              }
            }
          },
          type: "object"
        },
        EventAncillaryRevenueItemsPerFareFares: {
          required: [
            "fareId",
            "fareName",
            "fareFrom",
            "fareTo"
          ],
          properties: {
            fareId: {
              type: "string"
            },
            fareName: {
              type: "string"
            },
            fareFrom: {
              type: "string",
              format: "date-time"
            },
            fareTo: {
              type: "string",
              format: "date-time"
            }
          },
          type: "object"
        },
        EventVideoEmbed: {
          properties: {
            height: {
              type: "integer",
              format: "int32"
            },
            thumbnail_height: {
              type: "integer",
              format: "int32"
            },
            provider_name: {
              type: "string"
            },
            provider_url: {
              type: "string"
            },
            author_name: {
              type: "string"
            },
            version: {
              type: "string"
            },
            thumbnail_url: {
              type: "string"
            },
            type: {
              type: "string"
            },
            html: {
              type: "string"
            },
            title: {
              type: "string"
            },
            thumbnail_width: {
              type: "integer",
              format: "int32"
            },
            width: {
              type: "integer",
              format: "int32"
            },
            author_url: {
              type: "string"
            },
            video_url: {
              type: "string"
            }
          },
          type: "object"
        },
        EventImage: {
          properties: {
            height: {
              type: "integer",
              format: "int32"
            },
            width: {
              type: "integer",
              format: "int32"
            },
            marginLeft: {
              type: "integer",
              format: "int32"
            },
            marginTop: {
              type: "integer",
              format: "int32"
            },
            name: {
              type: "string"
            },
            unCacheKey: {
              type: "string"
            }
          },
          type: "object"
        },
        EventStatus: {
          properties: {
            enabled: {
              type: "string"
            },
            channel: {
              type: "string"
            },
            displayText: {
              type: "string"
            },
            statusEnabledText: {
              type: "string"
            },
            statusDisabledText: {
              type: "string"
            },
            statusDisabledTextCustom: {
              type: "string"
            }
          },
          type: "object"
        },
        Event: {
          required: [
            "_id",
            "accountId",
            "userId",
            "name",
            "inventoryId"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the object"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            name: {
              type: "string"
            },
            inventoryId: {
              type: "string"
            },
            seatMapId: {
              type: "string"
            },
            inventoryName: {
              type: "string"
            },
            seatMapName: {
              type: "string"
            },
            overview: {
              type: "string"
            },
            duration: {
              type: "string"
            },
            durationUnits: {
              type: "string"
            },
            schedules: {
              type: "array",
              items: {
                $ref: "#/definitions/EventSchedule"
              }
            },
            prices: {
              type: "array",
              items: {
                $ref: "#/definitions/EventPrice"
              }
            },
            ancillaryRevenue: {
              type: "array",
              items: {
                $ref: "#/definitions/EventAncillaryRevenue"
              }
            },
            tos: {
              type: "string"
            },
            disabled: {
              type: "boolean"
            },
            videos: {
              type: "string"
            },
            videosEmbed: {
              type: "array",
              items: {
                $ref: "#/definitions/EventVideoEmbed"
              }
            },
            map: {
              type: "string"
            },
            image: {
              $ref: "#/definitions/EventImage"
            },
            productId: {
              type: "string"
            },
            salesEnabled: {
              type: "boolean"
            },
            salesText: {
              type: "string"
            },
            status: {
              $ref: "#/definitions/EventStatus"
            },
            isDraft: {
              type: "boolean"
            },
            isSoldOut: {
              type: "boolean"
            },
            lastScheduledDate: {
              $ref: "#/definitions/BzDate"
            },
            color: {
              type: "string"
            },
            hoverColor: {
              type: "string"
            },
            expire: {
              type: "string"
            },
            dayFirst: {
              type: "boolean"
            },
            cutoffInPerson: {
              type: "integer",
              format: "int32"
            },
            cutoffOnline: {
              type: "integer",
              format: "int32"
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              $ref: "#/definitions/BzDate"
            },
            updatedAt: {
              $ref: "#/definitions/BzDate"
            }
          },
          type: "object"
        },
        GiftCertificates: {
          properties: {
            events: {
              type: "array",
              items: {
                $ref: "#/definitions/GiftCertificate"
              }
            }
          },
          type: "object"
        },
        GiftCertificate: {
          required: [
            "_id",
            "accountId",
            "userId",
            "name"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the object"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            name: {
              type: "string",
              description: "A name for the Gift certificate"
            },
            description: {
              type: "string",
              description: "A generic description for the gift certificate"
            },
            price: {
              type: "number",
              minimum: 0
            },
            value: {
              type: "number",
              minimum: 0
            },
            savings: {
              type: "number",
              minimum: 0
            },
            image: {
              type: "string"
            },
            disabled: {
              type: "boolean"
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          type: "object"
        },
        Seatmap: {
          required: [
            "_id",
            "accountId",
            "userId",
            "name"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier for the object"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            name: {
              type: "string",
              description: "A name for the seatmap"
            },
            sections: {
              type: "array",
              items: {
                $ref: "#/definitions/SeatmapSection"
              }
            },
            capacity: {
              type: "integer",
              format: "int32"
            },
            disabled: {
              type: "boolean"
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          },
          type: "object"
        },
        SeatmapSection: {
          required: [
            "id",
            "name"
          ],
          properties: {
            name: {
              type: "string"
            },
            rows: {
              type: "array",
              items: {
                $ref: "#/definitions/SeatmapSectionRow"
              }
            },
            rowAlignment: {
              type: "string"
            },
            color: {
              type: "string"
            },
            id: {
              type: "string"
            },
            position: {
              type: "object",
              items: {
                $ref: "#/definitions/SeatmapSectionPosition"
              }
            }
          },
          type: "object"
        },
        SeatmapSectionRow: {
          required: [
            "label",
            "seats"
          ],
          properties: {
            label: {
              type: "string"
            },
            seats: {
              type: "array",
              items: {
                type: "object"
              }
            }
          },
          type: "object"
        },
        SeatmapSectionRowSeat: {
          required: [
            "number",
            "type",
            "numberDirection"
          ],
          properties: {
            number: {
              type: "string"
            },
            type: {
              type: "string"
            },
            numberDirection: {
              type: "string"
            }
          },
          type: "object"
        },
        SeatmapSectionPosition: {
          required: [
            "top",
            "left"
          ],
          properties: {
            top: {
              type: "string"
            },
            left: {
              type: "string"
            }
          },
          type: "object"
        },
        PromoUpdateOperation: {
          type: "object",
          required: [
            "op",
            "path",
            "value"
          ],
          properties: {
            op: {
              type: "string",
              description: "The operation to apply",
              enum: [
                "subtract"
              ]
            },
            path: {
              type: "string",
              description: "The complete path to the Rule to modify level"
            },
            value: {
              type: "string",
              description: "The value to use with the operation"
            }
          }
        },
        PatchedPromos: {
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/definitions/PatchResult"
              }
            }
          },
          type: "object"
        },
        PatchResult: {
          properties: {
            op: {
              type: "string",
              description: "Name of the operation"
            },
            documentsUpdated: {
              description: "Price for the fare",
              type: "integer",
              format: "int32"
            },
            status: {
              type: "string",
              description: "status of the operation"
            },
            error: {
              type: "object",
              description: "Error object in case it occurs"
            }
          },
          type: "object"
        },
        DistanceBucket: {
          type: "object",
          required: [
            "accountId",
            "from",
            "to",
            "price",
            "productIds"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            productIds: {
              type: "array",
              items: {
                type: "string",
                description: "A product Id"
              }
            },
            from: {
              type: "integer",
              format: "int32",
              minimum: 0
            },
            to: {
              type: "integer",
              format: "int32",
              minimum: 0
            },
            price: {
              type: "number",
              minimum: 0
            }
          }
        },
        DistanceBuckets: {
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/definitions/DistanceBucket"
              }
            }
          },
          type: "object"
        },
        FallbackCode: {
          type: "object",
          required: [
            "accountId",
            "userId",
            "name",
            "fareId",
            "payOnAccountId"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            userId: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            name: {
              type: "string",
              description: "The name of the fall-back code"
            },
            code: {
              type: "string",
              description: "The fall-back code"
            },
            fareId: {
              type: "string",
              description: "The fare id that will be used to create the ticket when the code is scanned"
            },
            fareClassId: {
              type: "string",
              description: "The fare class id that will be used to create the ticket when the code is scanned"
            },
            payOnAccountId: {
              type: "string",
              description: "The account that will be used to charge the ticket when the code is scanned"
            },
            disabled: {
              type: "boolean"
            },
            deleted: {
              type: "boolean"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            createdBy: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            updatedBy: {
              type: "string",
              description: "The unique identifier for the user that last updated it"
            }
          }
        },
        FallbackCodes: {
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/definitions/FallbackCode"
              }
            }
          },
          type: "object"
        },
        ExternalPass: {
          required: [
            "accountId",
            "passNumber",
            "fareId",
            "expirationDate",
            "accountName"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            passNumber: {
              type: "string",
              description: "The number that is displayed in the bar code"
            },
            fareId: {
              type: "string",
              description: "The fare associated to this pass"
            },
            fareClassId: {
              type: "string",
              description: "The fare class associated to this pass (if any)"
            },
            expirationDate: {
              type: "string",
              description: "Expiration Date for the pass"
            },
            origin: {
              type: "string",
              description: "Origin station name"
            },
            originStationId: {
              type: "string",
              description: "Origin station ID"
            },
            destination: {
              type: "string",
              description: "Destination station name"
            },
            destinationStationId: {
              type: "string",
              description: "Destination station ID"
            },
            scansPerDay: {
              type: "string",
              description: "Total maximum scans per 24 hr period"
            },
            accountName: {
              type: "string",
              description: "Must match exactly to an existing Pay on Account form of payment"
            },
            scansMax: {
              type: "string",
              description: "Maximum available scans for the pass holder"
            },
            currentScans: {
              type: "string",
              description: "Current scans for this pass"
            },
            tripIds: {
              description: "All the tripIds for which the pass was scanned",
              type: "array",
              items: {
                type: "object"
              }
            },
            currentScansPerDay: {
              type: "object",
              description: "Object where the key is the date and the value the number of scans"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Creation date for this pass"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Updated date for this pass"
            }
          },
          type: "object"
        },
        ExternalPasses: {
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/definitions/ExternalPass"
              }
            }
          },
          type: "object"
        },
        Scan: {
          properties: {
            tripId: {
              type: "string",
              description: "id for the trip in which this scan happened"
            },
            dateTime: {
              type: "string",
              format: "date-time",
              description: "scan date and time"
            },
            scannedStopId: {
              type: "string",
              description: "id of the station where this scan happened"
            },
            scannedStopName: {
              type: "string",
              description: "name of the station where this scan happened"
            },
            originStationId: {
              type: "string",
              description: "originStationId of the external pass in case it has one. Otherwise, originStationId of the trip for this scan"
            },
            originStationName: {
              type: "string",
              description: "originStationName of the external pass in case it has one. Otherwise, originStationName of the trip for this scan"
            },
            destinationStationId: {
              type: "string",
              description: "destinationStationId of the external pass in case it has one. Otherwise, destinationStationId of the trip for this scan"
            },
            destinationStationName: {
              type: "string",
              description: "destinationStationName of the external pass in case it has one. Otherwise, destinationStationName of the trip for this scan"
            },
            scannedByUserId: {
              type: "string",
              description: "id of the user who made this scan"
            },
            scannedByUserName: {
              type: "string",
              description: "name of the user who made this scan"
            }
          },
          type: "object"
        },
        ExternalPassScan: {
          required: [
            "externalPass"
          ],
          properties: {
            externalPass: {
              $ref: "#/definitions/ExternalPass"
            },
            scan: {
              $ref: "#/definitions/Scan"
            }
          },
          type: "object"
        },
        ExternalPassesScans: {
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/definitions/ExternalPassScan"
              }
            }
          },
          type: "object"
        },
        FilteredTripSegment: {
          properties: {
            scheduleId: {
              type: "string",
              description: "The ID of the schedule used in this segment"
            },
            scheduleDisplayName: {
              type: "string",
              description: "The friendly name of schedule used in this segment"
            },
            originId: {
              type: "string",
              description: "The ID of the origin station for this segment"
            },
            destinationId: {
              type: "string",
              description: "The ID of the destination station for this segment"
            },
            origin: {
              type: "string",
              description: "The name of the origin station for this segment"
            },
            destination: {
              type: "string",
              description: "The name of the destination station for this segment"
            },
            stops: {
              type: "array",
              description: "An array of the stops visited in this segment, from first to last. Currently, only the Origin and Destination stations are listed here. Any intermediary stops are not listed.",
              items: {
                type: "string",
                description: "The name of the station"
              }
            }
          },
          type: "object"
        },
        FilteredTripRequest: {
          properties: {
            productId: {
              type: "string",
              description: "The ID of the product that this blacklisted trip will apply to"
            },
            segments: {
              type: "array",
              items: {
                $ref: "#/definitions/FilteredTripSegmentRequest"
              }
            }
          },
          type: "object"
        },
        FilteredTripSegmentRequest: {
          properties: {
            scheduleId: {
              type: "string",
              description: "The ID of the schedule used in this segment"
            },
            originId: {
              type: "string",
              description: "The ID of the origin station for this segment"
            },
            destinationId: {
              type: "string",
              description: "The ID of the destination station for this segment"
            }
          },
          type: "object"
        },
        FilteredTrip: {
          properties: {
            _id: {
              type: "string",
              description: "The unique ID for this filtered trip record"
            },
            accountId: {
              type: "string",
              description: "The account where this record is defined"
            },
            originId: {
              type: "string",
              description: "The ID of the origin station for this trip"
            },
            destinationId: {
              type: "string",
              description: "The ID of the destination station for this trip"
            },
            origin: {
              type: "string",
              description: "The name of the origin station for this trip"
            },
            destination: {
              type: "string",
              description: "The name of the destination station for this trip"
            },
            tripSegmentsId: {
              type: "string",
              description: "An ID which encodes details of the trip"
            },
            hashedTripSegmentsId: {
              type: "string",
              description: "A hash of the tripSegmentsId"
            },
            segments: {
              type: "array",
              description: "An array describing the segments of the trip",
              items: {
                $ref: "#/definitions/FilteredTripSegment"
              }
            }
          },
          type: "object"
        },
        FilteredTrips: {
          properties: {
            tax: {
              type: "array",
              items: {
                $ref: "#/definitions/FilteredTrip"
              }
            }
          },
          type: "object"
        },
        Bundle: {
          properties: {
            productTypes: {
              type: "array",
              items: {
                type: "string",
                description: "A product type"
              }
            }
          },
          type: "object"
        },
        ManifestTrip: {
          properties: {
            routeId: {
              type: "string",
              description: "The associated routeId"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            routeName: {
              type: "string",
              description: "The name for the associated route"
            },
            scheduleName: {
              type: "string",
              description: "The schedule name"
            },
            scheduleDisplayName: {
              type: "string",
              description: "The schedule display name"
            },
            legs: {
              type: "array",
              items: {
                $ref: "#/definitions/Leg"
              },
              description: "The legs for the schedule"
            },
            capacity: {
              type: "integer",
              format: "int32",
              description: "The capacity for the schedule"
            },
            time: {
              type: "string",
              description: "The time for the schedule"
            },
            productIds: {
              type: "array",
              items: {
                type: "string",
                description: "A product Id"
              },
              description: "The associated product IDs"
            }
          },
          type: "object"
        },
        ParcelZones: {
          properties: {
            parcelZones: {
              type: "array",
              items: {
                $ref: "#/definitions/ParcelZone"
              }
            }
          },
          type: "object"
        },
        ParcelZone: {
          type: "object",
          required: [
            "accountId",
            "productId"
          ],
          properties: {
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            productId: {
              type: "string",
              description: "The productId of this parcel zone"
            },
            provinces: {
              type: "array",
              items: {
                type: "string",
                description: "The name of the province"
              }
            },
            buckets: {
              type: "array",
              items: {
                $ref: "#/definitions/ParcelZoneBucket"
              }
            },
            overweightBuckets: {
              type: "array",
              items: {
                $ref: "#/definitions/ParcelZoneOverweightBucket"
              }
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Measure: {
          properties: {
            value: {
              type: "number"
            },
            unit: {
              type: "string"
            }
          },
          type: "object"
        },
        ParcelZoneOverweightBucket: {
          properties: {
            minDistance: {
              $ref: "#/definitions/Measure"
            },
            maxDistance: {
              $ref: "#/definitions/Measure"
            },
            price: {
              type: "number",
              format: "float"
            },
            priceToDisplay: {
              type: "string"
            }
          },
          type: "object"
        },
        ParcelZoneBucket: {
          properties: {
            minWeight: {
              $ref: "#/definitions/Measure"
            },
            maxWeight: {
              $ref: "#/definitions/Measure"
            },
            minDistance: {
              $ref: "#/definitions/Measure"
            },
            maxDistance: {
              $ref: "#/definitions/Measure"
            },
            price: {
              type: "number",
              format: "float"
            },
            priceToDisplay: {
              type: "string"
            }
          },
          type: "object"
        },
        Tax: {
          type: "object",
          required: [
            "accountId"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The name of the tax"
            },
            province: {
              type: "string",
              description: "The name of the province"
            },
            value: {
              type: "number",
              description: "The value of the tax"
            },
            disabled: {
              type: "boolean",
              description: "Determines if this tax is enabled or disabled"
            },
            deleted: {
              type: "boolean",
              description: "Determines if this tax is deleted"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            }
          }
        },
        Taxes: {
          properties: {
            tax: {
              type: "array",
              items: {
                $ref: "#/definitions/Taxes"
              }
            }
          },
          type: "object"
        },
        RoutePrice: {
          properties: {
            fareId: {
              type: "string",
              description: "The fare id"
            },
            lexiconKeys: {
              type: "object"
            },
            name: {
              type: "string"
            },
            price: {
              type: "integer"
            },
            priceToDisplay: {
              type: "string"
            }
          },
          type: "object"
        },
        RoutePrices: {
          properties: {
            tax: {
              type: "array",
              items: {
                $ref: "#/definitions/RoutePrice"
              }
            }
          },
          type: "object"
        },
        ErrorResponse: {
          properties: {
            code: {
              type: "string",
              description: "A string identifying the specific error."
            },
            message: {
              type: "string",
              description: "English description of the error, usually including some information on what caused the error"
            }
          },
          type: "object"
        },
        Amenities: {
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of amenities"
            },
            previous: {
              type: "string",
              description: "The link to the previous page"
            },
            next: {
              type: "string",
              description: "The link to the next page"
            },
            amenities: {
              type: "array",
              description: "The amenities for the current page",
              items: {
                $ref: "#/definitions/Amenity"
              }
            }
          },
          type: "object"
        },
        Amenity: {
          required: [
            "name",
            "icon",
            "enabled"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The name of the amenity"
            },
            enabled: {
              type: "boolean"
            },
            createdBy: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            updatedBy: {
              type: "string",
              description: "The unique identifier for the user that last updated it"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            icon: {
              type: "string"
            },
            lexiconKeys: {
              type: "object",
              required: [
                "name"
              ],
              description: "Lexicon keys for amenities",
              properties: {
                name: {
                  type: "string",
                  description: "The key to the amenity' name."
                }
              }
            }
          },
          type: "object"
        },
        AmenityLexiconKeys: {
          type: "object",
          description: "Lexicon keys for amenity",
          properties: {
            name: {
              type: "string",
              description: "The key for the amenity name."
            }
          }
        },
        AmenitySaveRequest: {
          type: "object",
          required: [
            "name",
            "icon",
            "enabled",
            "lexiconKeys"
          ],
          description: "Amenity data schema for Amenities Data Service save",
          properties: {
            name: {
              type: "string",
              description: "The name for the amenity."
            },
            icon: {
              type: "string",
              description: "The icon for the amenity."
            },
            enabled: {
              type: "boolean",
              description: "The enabled status for the amenity."
            },
            lexiconKeys: {
              description: "The lexicon values for amenity name.",
              $ref: "#/definitions/AmenityLexiconKeys"
            }
          }
        },
        AmenityUpdateRequest: {
          properties: {
            name: {
              type: "string"
            },
            icon: {
              type: "string"
            },
            enabled: {
              type: "boolean"
            },
            lexiconKeys: {
              $ref: "#/definitions/AmenityLexiconKeys"
            }
          },
          type: "object"
        },
        AmenityGroups: {
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of amenity groups"
            },
            previous: {
              type: "string",
              description: "The link to the previous page"
            },
            next: {
              type: "string",
              description: "The link to the next page"
            },
            amenityGroups: {
              type: "array",
              description: "The amenity groups for the current page",
              items: {
                $ref: "#/definitions/AmenityGroup"
              }
            }
          },
          type: "object"
        },
        AmenityGroup: {
          required: [
            "name",
            "enabled",
            "lexiconKeys"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The name of the amenity group"
            },
            enabled: {
              type: "boolean"
            },
            amenityIds: {
              type: "array",
              description: "The amenity ids from the group",
              items: {
                type: "string"
              }
            },
            createdBy: {
              type: "string",
              description: "The unique identifier for the user that created it"
            },
            updatedBy: {
              type: "string",
              description: "The unique identifier for the user that last updated it"
            },
            createdAt: {
              type: "string",
              format: "date-time"
            },
            updatedAt: {
              type: "string",
              format: "date-time"
            },
            lexiconKeys: {
              type: "object",
              description: "Lexicon keys for amenity group",
              properties: {
                name: {
                  type: "string",
                  description: "The key to the amenity group's name."
                }
              }
            }
          },
          type: "object"
        },
        AmenityGroupLexiconKeys: {
          type: "object",
          description: "Lexicon keys for amenity groups",
          properties: {
            name: {
              type: "string",
              description: "The key for the amenity group's name."
            }
          }
        },
        AmenityGroupSaveRequest: {
          type: "object",
          required: [
            "name",
            "enabled",
            "lexiconKeys",
            "amenityIds"
          ],
          description: "Amenity Group data schema for Data Service save",
          properties: {
            name: {
              type: "string",
              description: "The name for the amenity."
            },
            enabled: {
              type: "boolean",
              description: "The enabled status for the amenity."
            },
            lexiconKeys: {
              description: "The lexicon keys for amenity name.",
              $ref: "#/definitions/AmenityGroupLexiconKeys"
            },
            amenityIds: {
              type: "array",
              description: "The amenity ids from the group",
              items: {
                type: "string"
              }
            }
          }
        },
        AmenityGroupUpdateRequest: {
          type: "object",
          description: "Amenity Group data schema for Data Service update",
          properties: {
            name: {
              type: "string",
              description: "The name for the amenity group."
            },
            enabled: {
              type: "boolean",
              description: "The enabled status for the amenity."
            },
            lexiconKeys: {
              description: "The lexicon values for amenity name.",
              $ref: "#/definitions/AmenityGroupLexiconKeys"
            },
            amenityIds: {
              type: "array",
              description: "The amenity ids from the group",
              items: {
                type: "string"
              }
            }
          }
        },
        OperationMessages: {
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of operation messages"
            },
            previous: {
              type: "string",
              description: "The link to the previous page"
            },
            next: {
              type: "string",
              description: "The link to the next page"
            },
            operationMessages: {
              type: "array",
              items: {
                $ref: "#/definitions/OperationMessage"
              }
            }
          },
          type: "object"
        },
        OperationMessage: {
          type: "object",
          description: "Operation message data schema",
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            message: {
              type: "string",
              description: "The operation message"
            },
            name: {
              type: "string",
              description: "A name for user to see in the messages grid in the UI to identify a message"
            },
            effectiveDateTimeStart: {
              type: "string",
              format: "date-time"
            },
            effectiveDateTimeEnd: {
              type: "string",
              format: "date-time"
            },
            stationId: {
              type: "string",
              description: "Store the station Id to display the message for"
            },
            stationName: {
              type: "string",
              description: "Store the station name to display the message for"
            },
            type: {
              type: "string",
              enum: [
                "out-of-order",
                "warning"
              ],
              description: "Type of the operation message"
            },
            active: {
              type: "boolean",
              description: "Status of the operation message. Default: true"
            },
            displayOnTicket: {
              type: "boolean",
              description: "Option for include the messages in printed tickets. Default: false"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            createdBy: {
              type: "string",
              description: "The unique identifier for the user who created this"
            },
            updatedBy: {
              type: "string",
              description: "The unique identifier for the user that last updated this"
            },
            createdAt: {
              type: "string",
              format: "date-time",
              description: "Datetime when the operation message was created"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              description: "Datetime when the operation message was last updated"
            },
            lexiconKeys: {
              $ref: "#/definitions/OperationMessageLexiconKeys"
            }
          }
        },
        OperationMessageCreate: {
          type: "object",
          description: "Operation message data schema for creation",
          required: [
            "message",
            "name",
            "type",
            "effectiveDateTimeStart",
            "effectiveDateTimeEnd"
          ],
          properties: {
            message: {
              type: "string",
              description: "The operation message"
            },
            name: {
              type: "string",
              description: "A name for user to see in the messages grid in the UI to identify a message"
            },
            effectiveDateTimeStart: {
              type: "string",
              format: "date-time"
            },
            effectiveDateTimeEnd: {
              type: "string",
              format: "date-time"
            },
            stationId: {
              type: "string",
              description: "Store the station Id to display the message for. Mandatory if type is out-of-order"
            },
            type: {
              type: "string",
              enum: [
                "out-of-order",
                "warning"
              ],
              description: "Type of the operation message"
            },
            active: {
              type: "boolean",
              description: "Status of the operation message. Default: true"
            },
            lexiconKeys: {
              description: "The lexicon message for the operation message",
              $ref: "#/definitions/OperationMessageLexiconKeys"
            }
          }
        },
        OperationMessageUpdate: {
          type: "object",
          description: "Operation message data schema for update",
          properties: {
            message: {
              type: "string",
              description: "The operation message"
            },
            name: {
              type: "string",
              description: "A name for user to see in the messages grid in the UI to identify a message"
            },
            effectiveDateTimeStart: {
              type: "string",
              format: "date-time"
            },
            effectiveDateTimeEnd: {
              type: "string",
              format: "date-time"
            },
            stationId: {
              type: "string",
              description: "Store the station Id to display the message for. Mandatory if type is out-of-order"
            },
            type: {
              type: "string",
              enum: [
                "out-of-order",
                "warning"
              ],
              description: "Type of the operation message"
            },
            active: {
              type: "boolean",
              description: "Status of the operation message"
            },
            lexiconKeys: {
              description: "The lexicon message for the operation message",
              $ref: "#/definitions/OperationMessageLexiconKeys"
            }
          }
        },
        OperationMessageLexiconKeys: {
          type: "object",
          required: [
            "message"
          ],
          description: "The lexicon message for the operation message.",
          properties: {
            message: {
              type: "string",
              description: "The lexicon message for the operation message"
            }
          }
        },
        OperationMessagesStationsQuery: {
          type: "object",
          description: "Stations and dates for querying operation messages",
          required: [
            "stations"
          ],
          properties: {
            stations: {
              type: "array",
              description: "Array of stations and date time for querying",
              minItems: 1,
              items: {
                $ref: "#/definitions/StationDateTime"
              }
            },
            lang: {
              type: "string",
              description: "A iso code for languages. By default 'en'"
            }
          }
        },
        OperationMessagesStations: {
          type: "object",
          description: "Operation messages by stations response body",
          properties: {
            operationMessagesByStationId: {
              type: "object",
              description: "key by station id each object contains an array of the Operation messages with the lexicon key and display option"
            }
          }
        },
        StationDateTime: {
          type: "object",
          description: "Data for obtain the operation messages by station id and date time",
          required: [
            "date"
          ],
          properties: {
            stationId: {
              type: "string",
              description: "the origin station id"
            },
            date: {
              type: "string"
            }
          }
        },
        ImportResultResponse: {
          properties: {
            results: {
              type: "array",
              items: {
                $ref: "#/definitions/ImportResult"
              }
            }
          },
          type: "object"
        },
        ImportResult: {
          properties: {
            action: {
              type: "string"
            },
            status: {
              type: "string"
            },
            error: {
              type: "string"
            },
            id: {
              type: "string"
            }
          },
          type: "object"
        },
        GetPaymentTerminalsResponse: {
          type: "object",
          properties: {
            paymentTerminals: {
              type: "array",
              items: {
                $ref: "#/definitions/PaymentTerminal"
              }
            },
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of possible results"
            }
          }
        },
        DeletedPaymentTerminalResponse: {
          type: "object",
          properties: {
            paymentTerminalId: {
              type: "string",
              description: "The payment terminal id",
              pattern: "^[0-9a-f]{24}$"
            }
          }
        },
        GetPaymentTerminalResponse: {
          type: "object",
          required: [
            "paymentTerminal"
          ],
          properties: {
            paymentTerminal: {
              $ref: "#/definitions/PaymentTerminal"
            }
          }
        },
        PaymentTerminalPost: {
          type: "object",
          required: [
            "name",
            "protocol",
            "ip",
            "locationId",
            "partNumber",
            "serialNumber"
          ],
          properties: {
            name: {
              type: "string",
              description: "An unique name to identify the terminal",
              example: "Terminal 1"
            },
            protocol: {
              type: "string",
              description: "The protocol to use to communicate one of 'ws', 'wss'",
              enum: [
                "ws",
                "wss"
              ]
            },
            ip: {
              type: "string",
              description: "The ip address of the terminal",
              example: "192.168.10.10",
              pattern: "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
            },
            locationId: {
              type: "string",
              description: "The location Id where the terminal is located, locations are created under 'Stations' in BTRZ.",
              example: "5f243d100617680712e78dd7",
              pattern: "^[0-9a-f]{24}$"
            },
            partNumber: {
              type: "string",
              description: "The part number of the terminal, usually starts with 'TRD'",
              example: "TRD30110877A"
            },
            serialNumber: {
              type: "string",
              description: "The serial number of the terminal"
            }
          }
        },
        PaymentTerminal: {
          type: "object",
          required: [
            "_id",
            "name",
            "protocol",
            "ip",
            "locationId",
            "partNumber",
            "serialNumber"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The payment terminal id",
              pattern: "^[0-9a-f]{24}$"
            },
            name: {
              type: "string",
              description: "An unique name to identify the terminal",
              example: "Terminal 1"
            },
            protocol: {
              type: "string",
              description: "The protocol to use to communicate one of 'ws', 'wss'",
              enum: [
                "ws",
                "wss"
              ]
            },
            ip: {
              type: "string",
              description: "The ip address of the terminal",
              example: "192.168.10.10",
              pattern: "^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]).){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$"
            },
            locationId: {
              type: "string",
              description: "The location Id where the terminal is located, locations are created under 'Stations' in BTRZ.",
              example: "5f243d100617680712e78dd7",
              pattern: "^[0-9a-f]{24}$"
            },
            partNumber: {
              type: "string",
              description: "The part number of the terminal, usually starts with 'TRD'",
              example: "TRD30110877A"
            },
            serialNumber: {
              type: "string",
              description: "The serial number of the terminal"
            },
            createdBy: {
              type: "string",
              description: "The user that created this resource",
              example: "5f243d100617680712e78dd7",
              pattern: "^[0-9a-f]{24}$"
            },
            updatedBy: {
              type: "string",
              description: "The last user that updated this resource",
              example: "5f243d100617680712e78dd7",
              pattern: "^[0-9a-f]{24}$"
            },
            createdAt: {
              $ref: "#/definitions/BzDate",
              description: "The date the object was created"
            },
            updatedAt: {
              $ref: "#/definitions/BzDate",
              description: "The date the object was last updated"
            }
          }
        },
        PostalCodes: {
          required: [
            "postalCodes"
          ],
          properties: {
            postalCodes: {
              type: "array",
              items: {
                $ref: "#/definitions/PostalCode"
              }
            }
          },
          type: "object"
        },
        ScheduleLeg: {
          required: [
            "departure",
            "arrival",
            "fromId",
            "toId"
          ],
          properties: {
            departure: {
              type: "string",
              description: "The departure time from the departure station in HH:MM 24 hrs format",
              pattern: "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
            },
            arrival: {
              type: "string",
              description: "The arrival time from the arrival station in HH:MM 24 hrs format",
              pattern: "^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$"
            },
            fromId: {
              type: "string",
              description: "The id for the departure station",
              pattern: "^[0-9a-f]{24}$"
            },
            toId: {
              type: "string",
              description: "The id for the arrival station",
              pattern: "^[0-9a-f]{24}$"
            },
            fromNameId: {
              type: "string",
              description: "The ID of the departure station alternative name (if available)",
              pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
            },
            toNameId: {
              type: "string",
              description: "The ID of the arrival station alternative name (if available)",
              pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
            }
          },
          type: "object"
        },
        SchedulePostData: {
          required: [
            "displayName",
            "fromDateYYYYMMDD",
            "toDateYYYYMMDD",
            "dow",
            "legs"
          ],
          properties: {
            displayName: {
              type: "string",
              description: "The schedule display name"
            },
            fromDateYYYYMMDD: {
              type: "string",
              description: "The first date this schedule will be available, mm/dd/yyyy format",
              pattern: "^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$"
            },
            toDateYYYYMMDD: {
              type: "string",
              description: "The last date this schedule will be available, mm/dd/yyyy format",
              pattern: "^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$"
            },
            dow: {
              $ref: "#/definitions/Dow"
            },
            legs: {
              type: "array",
              description: "A list of legs for this schedule",
              minItems: 1,
              items: {
                $ref: "#/definitions/ScheduleLeg"
              }
            },
            capacity: {
              type: "integer",
              description: "Schedule capacity (mandatory if no seatMapId is given)"
            },
            amenityGroupId: {
              type: "string",
              description: "The Id of the amenityGroup associated to this schedule (if any)",
              pattern: "^[0-9a-f]{24}$"
            },
            brandId: {
              type: "string",
              description: "The Id of the brand associated to this schedule (if any)",
              pattern: "^[0-9a-f]{24}$"
            },
            inventoryId: {
              type: "string",
              description: "The id of the inventory associated to this schedule (if given capacity will be ignored)",
              pattern: "^[0-9a-f]{24}$"
            },
            operatingCompanyId: {
              type: "string",
              description: "The id of the operating company associated to this schedule (if any)",
              pattern: "^[0-9a-f]{24}$"
            },
            seatMapId: {
              type: "string",
              description: "The id of the seatMap associated to this schedule (if given capacity will be ignored)",
              pattern: "^[0-9a-f]{24}$"
            },
            serviceNumberId: {
              type: "string",
              description: "The id of the service number associated to this schedule (if any)",
              pattern: "^[0-9a-f]{24}$"
            }
          },
          type: "object"
        },
        NewScheduleResponse: {
          properties: {
            schedule: {
              $ref: "#/definitions/NewSchedule"
            }
          },
          type: "object"
        },
        NewSchedule: {
          properties: {
            id: {
              type: "string",
              description: "The schedule id",
              pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$"
            },
            name: {
              type: "string",
              description: "The schedule name (in new schedules same as id)"
            },
            routeId: {
              type: "string",
              description: "The route id the schedule is associated to",
              pattern: "^[0-9a-f]{24}$"
            },
            displayName: {
              type: "string",
              description: "The schedule display name"
            },
            fromDateYYYYMMDD: {
              type: "string",
              description: "The first date this schedule will be available, mm/dd/yyyy format",
              pattern: "^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$"
            },
            toDateYYYYMMDD: {
              type: "string",
              description: "The last date this schedule will be available, mm/dd/yyyy format",
              pattern: "^[0-9]{4}-(1[0-2]|0[1-9])-(3[01]|[12][0-9]|0[1-9])$"
            },
            dow: {
              $ref: "#/definitions/Dow"
            },
            legs: {
              type: "array",
              description: "A list of legs for this schedule",
              minItems: 1,
              items: {
                $ref: "#/definitions/ScheduleLeg"
              }
            },
            capacity: {
              type: "integer",
              description: "Schedule capacity (mandatory if no seatMapId is given)"
            },
            amenityGroupId: {
              type: "string",
              description: "The Id of the amenityGroup associated to this schedule (if any)",
              pattern: "^[0-9a-f]{24}$"
            },
            brandId: {
              type: "string",
              description: "The Id of the brand associated to this schedule (if any)",
              pattern: "^[0-9a-f]{24}$"
            },
            inventoryId: {
              type: "string",
              description: "The id of the inventory associated to this schedule (if given capacity will be ignored)",
              pattern: "^[0-9a-f]{24}$"
            },
            operatingCompanyId: {
              type: "string",
              description: "The id of the operating company associated to this schedule (if any)",
              pattern: "^[0-9a-f]{24}$"
            },
            seatMapId: {
              type: "string",
              description: "The id of the seatMap associated to this schedule (if given capacity will be ignored)",
              pattern: "^[0-9a-f]{24}$"
            },
            serviceNumberId: {
              type: "string",
              description: "The id of the service number associated to this schedule (if any)",
              pattern: "^[0-9a-f]{24}$"
            }
          },
          type: "object"
        },
        GetScheduleResponse: {
          properties: {
            displayName: {
              type: "string",
              description: "The schedule display name"
            },
            fromDate: {
              type: "string",
              description: "The first date this schedule will be available, mm/dd/yyyy format"
            },
            toDate: {
              type: "string",
              description: "The last date this schedule will be available, mm/dd/yyyy format"
            },
            dow: {
              $ref: "#/definitions/Dow"
            },
            legs: {
              type: "array",
              description: "A list of legs for this schedule",
              minItems: 1,
              items: {
                $ref: "#/definitions/ScheduleLeg"
              }
            }
          },
          type: "object"
        },
        GetSchedulesResponse: {
          properties: {
            schedules: {
              type: "array",
              items: {
                $ref: "#/definitions/GetScheduleResponse"
              }
            },
            next: {
              type: "string",
              description: "A URL pointing to the next page of results. If no more results are available, this will be an empty string."
            },
            previous: {
              type: "string",
              description: "A URL pointing to the previous page of results. If no previous results are available (ie. you are already viewing the first page of results), this will be an empty string."
            },
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of results returned by your query, across all pages."
            }
          },
          type: "object"
        },
        RouteResponse: {
          required: [
            "_id",
            "name",
            "accountId"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The name of the route"
            },
            stopsIds: {
              type: "array",
              description: "The IDs of the stops in this route",
              items: {
                type: "string"
              }
            },
            schedules: {
              type: "array",
              description: "An array of schedules defined for this route",
              items: {
                $ref: "#/definitions/ScheduleInRoute"
              }
            },
            productIds: {
              type: "array",
              description: "Ids of the products associated to this route",
              items: {
                type: "string"
              }
            },
            disabled: {
              type: "boolean",
              description: "This route is disabled and schedules in this route will not be available for new bookings"
            }
          },
          type: "object"
        },
        GetRoutesResponse: {
          properties: {
            routes: {
              type: "array",
              items: {
                $ref: "#/definitions/RouteResponse"
              }
            }
          },
          type: "object"
        },
        StationResponse: {
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The name for the station"
            },
            alternativeNames: {
              type: "array",
              description: "This array contains the alternative names for the station",
              items: {
                type: "string"
              }
            },
            stationsGroupedWithThisStation: {
              type: "array",
              description: "This array contains stations IDs grouped by the current station",
              items: {
                type: "string"
              }
            }
          },
          type: "object"
        },
        GetStationsResponse: {
          properties: {
            routes: {
              type: "array",
              items: {
                $ref: "#/definitions/StationResponse"
              }
            }
          },
          type: "object"
        },
        GetSeatmapResponse: {
          properties: {
            seatmap: {
              $ref: "#/definitions/GetSeatmapItem"
            }
          },
          type: "object"
        },
        GetSeatmapItem: {
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier"
            },
            accountId: {
              type: "string",
              description: "The account where this object is defined"
            },
            name: {
              type: "string",
              description: "The seatmap name"
            },
            capacity: {
              type: "integer",
              description: "The seatmap max capacity"
            },
            sections: {
              type: "array",
              description: "A list of sections in the seatmap",
              items: {
                $ref: "#/definitions/SeatmapSectionResponse"
              }
            }
          },
          type: "object"
        },
        SeatmapSectionResponse: {
          properties: {
            _id: {
              type: "string",
              description: "The _id",
              pattern: "^[0-9a-f]{24}$"
            },
            _type: {
              type: "string",
              description: "The type of section",
              enum: [
                "Section",
                "Label",
                "Picture"
              ]
            },
            label: {
              type: "string",
              description: "The label for the section"
            },
            rows: {
              type: "array",
              description: "A list of rows",
              items: {
                $ref: "#/definitions/SeatmapRow"
              }
            }
          },
          type: "object"
        },
        SeatmapRow: {
          properties: {
            label: {
              type: "string",
              description: "The label for the row"
            },
            seats: {
              type: "array",
              description: "A list of seats",
              items: {
                $ref: "#/definitions/SeatmapSeat"
              }
            }
          },
          type: "object"
        },
        SeatmapSeat: {
          properties: {
            id: {
              type: "string",
              description: "Identified for the seat"
            },
            label: {
              type: "string",
              description: "The label for the seat"
            },
            type: {
              type: "string",
              description: "The type of seat",
              enum: [
                "accesible",
                "block",
                "gap",
                "occupied",
                "open",
                "reserved"
              ]
            }
          },
          type: "object"
        },
        GetServiceNumberResponse: {
          required: [
            "serviceNumber"
          ],
          properties: {
            serviceNumber: {
              $ref: "#/definitions/ServiceNumber"
            }
          },
          type: "object"
        },
        GetServiceNumbersResponse: {
          required: [
            "serviceNumbers",
            "count"
          ],
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The number of records returned"
            },
            serviceNumbers: {
              type: "array",
              items: {
                $ref: "#/definitions/ServiceNumber"
              }
            }
          },
          type: "object"
        },
        ServiceNumberPostData: {
          required: [
            "name"
          ],
          properties: {
            name: {
              type: "string",
              description: "The name of the service number"
            },
            enabled: {
              type: "boolean",
              description: "Indicates if the service number is enabled or disables",
              default: true
            }
          },
          type: "object"
        },
        ServiceNumber: {
          type: "object",
          required: [
            "name"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique identifier",
              pattern: "^[0-9a-f]{24}$"
            },
            accountId: {
              type: "string",
              description: "The account that owns the service number",
              pattern: "^[0-9a-f]{24}$"
            },
            name: {
              type: "string",
              description: "A name for the service number"
            },
            enabled: {
              type: "boolean",
              description: "Indicates if the service number is enabled or disables"
            },
            createdBy: {
              type: "string",
              description: "The userId that created the service number",
              pattern: "^[0-9a-f]{24}$"
            },
            updatedBy: {
              type: "string",
              description: "The userId that last updated the service number",
              pattern: "^[0-9a-f]{24}$"
            },
            createdAt: {
              $ref: "#/definitions/BzDate",
              description: "The date the object was created"
            },
            updatedAt: {
              $ref: "#/definitions/BzDate",
              description: "The date the object was last updated"
            }
          }
        },
        GetStationGroupsResponse: {
          required: [
            "stationGroups"
          ],
          properties: {
            stationGroups: {
              type: "array",
              description: "A list of station groups sorted by name",
              items: {
                $ref: "#/definitions/StationGroup"
              }
            }
          },
          type: "object"
        },
        StationGroup: {
          type: "object",
          required: [
            "_id",
            "name",
            "accountId",
            "stationsGroupedWithThisStation"
          ],
          properties: {
            _id: {
              type: "string",
              description: "The unique Identifier"
            },
            accountId: {
              type: "string",
              description: "The accountId this group belongs to"
            },
            name: {
              type: "string",
              description: "The name of the station group"
            },
            stationsGroupedWithThisStation: {
              type: "array",
              description: "A list of station ids associated to the group"
            }
          }
        },
        StationZone: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the zone"
            }
          }
        },
        StationsZones: {
          properties: {
            count: {
              type: "integer",
              format: "int32",
              description: "The total number of zones"
            },
            previous: {
              type: "string",
              description: "The link to the previous page"
            },
            next: {
              type: "string",
              description: "The link to the next page"
            },
            zones: {
              type: "array",
              description: "The zones for the current page",
              items: {
                $ref: "#/definitions/StationZone"
              }
            }
          },
          type: "object"
        },
        GetStationResponse: {
          required: [
            "station"
          ],
          properties: {
            station: {
              description: "The requested station",
              $ref: "#/definitions/Station"
            }
          },
          type: "object"
        },
        StationsImport: {
          required: [
            "stations"
          ],
          properties: {
            stations: {
              type: "array",
              items: {
                $ref: "#/definitions/StationImport"
              }
            }
          },
          type: "object"
        },
        StationImport: {
          properties: {
            id: {
              type: "string"
            },
            name: {
              type: "string"
            },
            province: {
              type: "string"
            },
            zone: {
              type: "string"
            },
            timeZone: {
              type: "string"
            },
            latitude: {
              type: "string"
            },
            longitude: {
              type: "string"
            },
            primaryCurrencyCode: {
              type: "string"
            },
            acceptedCurrencies: {
              type: "array",
              items: {
                type: "string"
              }
            },
            displayedCurrencies: {
              type: "array",
              items: {
                type: "string"
              }
            },
            disabled: {
              type: "boolean"
            },
            deleted: {
              type: "boolean"
            }
          },
          type: "object"
        },
        StationConnexOverrides: {
          type: "object",
          required: [
            "waitingTimes"
          ],
          properties: {
            waitingTimes: {
              description: "The overrides for waiting time in this station",
              $ref: "#/definitions/StationConnexWaitingTimesOverrides"
            }
          }
        },
        StationConnexWaitingTimesOverrides: {
          type: "object",
          required: [
            "override"
          ],
          properties: {
            override: {
              type: "boolean",
              description: "If false min and max will default to zero and the connex level min and max wait-times will be used",
              default: "false"
            },
            min: {
              type: "integer",
              format: "int32",
              description: "If given and 'overrides' is true this time will be used as the minimum waiting time to connect in this station"
            },
            max: {
              type: "integer",
              format: "int32",
              description: "If given and 'overrides' is true this time will be used as the maximum waiting time to connect in this station"
            }
          }
        },
        SeatFeePostData: {
          id: "SeatFeePostData",
          type: "object",
          required: ["name", "shortName", "value", "type", "lexiconKeys"],
          properties: {
            "name": {
              "type": "string",
              "description": "The seat fee name",
              "example": "Premium"
            },
            "shortName": {
              "type": "string",
              "maxLength": 3,
              "description": "The seat fee short name, max of 3 characters",
              "example": "PRM"
            },
            "value": {
              "type": "number",
              "format": "float",
              "minimum": 0.01,
              "description": "The seat fee numeric value. The minimum is 0.01",
              "example": "10"
            },
            "type": {
              "type": "string",
              "description": "The seat fee numeric value type",
              "enum": ["$", "%"]
            },
            "disabled": {
              "type": "boolean",
              "description": "Indicates if the seat fee is disabled, it is false by default",
              "example": "false"
            },          
            "lexiconKeys": {
              "type": "object",
              "description": "The lexicons for the seat fee",
              "$ref": "#/definitions/SeatFeePostLexiconKeys"
            }          
          }
        },
        SeatFeePostLexiconKeys: {
          id: "SeatFeePostLexiconKeys",
          type: "object",
          required: ["name"],
          description: "The lexicon keys for the seat fee properties.",
          properties: {
            "name": {
              "type": "object",
              "description": "The lexicon key for the seat fee name",
              "$ref": "#/definitions/LexiconKeyValues"
            }
          }
        },
        LexiconKeyValues: {
          id: "LexiconKeyValues",
          type: "object",
          required: ["key", "values"],
          description: "The lexicon key values.",
          properties: {
            "key": {
              "type": "string",
              "description": "The lexicon key"
            },
            "values": {
              "type": "object",
              "description": "The lexicon values",
              "$ref": "#/definitions/LexiconValues"
            }
          }
        },
        LexiconValues: {
          id: "LexiconValues",
          type: "object",
          required: ["en-us"],
          description: "The lexicon values.",
          properties: {
            "en-us": {
              "type": "string",
              "description": "The lexicon value for en-us"
            },
            "fr-fr": {
              "type": "string",
              "description": "The lexicon value for fr-fr"
            },
            "de-de": {
              "type": "string",
              "description": "The lexicon value for de-de"
            },
            "nl-nl": {
              "type": "string",
              "description": "The lexicon value for nl-nl"
            },
            "es-ar": {
              "type": "string",
              "description": "The lexicon value for es-ar"
            }
          }
        }                        
      },
      securityDefinitions: {
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key"
        },
        JwtAuth: {
          type: "apiKey",
          in: "header",
          name: "Authorization: Bearer + jwt"
        }
      }
    };
  });

  it("should return null if schema not found", () => {
    const name = "InvalidName";
    const result = swaggerSchemaToUI(schema, name);
    expect(result).to.be.eql(null);
  });

  it("should return the proper schema given the name", () => {
    const name = "PaymentTerminalPost";
    const result = swaggerSchemaToUI(schema, name);
    expect(result).to.not.be.eql(null);
    expect(result.properties.serialNumber.type).to.be.eql("string");
  });

  it("should process the enum", () => {
    const name = "PaymentTerminalPost";
    const result = swaggerSchemaToUI(schema, name);
    expect(result.properties.protocol.options[0].key).to.be.eql("ws");
    expect(result.properties.protocol.options[0].value).to.be.eql("ws");
  });

  it("should set a hint property if given", () => {
    const name = "PaymentTerminalPost";
    const result = swaggerSchemaToUI(schema, name, {
      "PaymentTerminalPost.partNumber": {
        hint: "hintLexicon"
      }
    });
    expect(result).to.not.be.eql(null);
    expect(result.properties.partNumber.hint).to.be.eql("hintLexicon");
  });

  it("should turn a string property into an enum property", () => {
    const name = "PaymentTerminalPost";
    const result = swaggerSchemaToUI(schema, name, {
      "PaymentTerminalPost.locationId": {
        options: [
          { key: "1", value: "Superb" },
          { key: "3", value: "Third" }
        ]
      }
    });
    expect(result.properties.locationId.type).to.be.eql("string");
    expect(result.properties.locationId.enum).to.be.eql([]);
    expect(result.properties.locationId.options[0].key).to.be.eql("1");
    expect(result.properties.locationId.options[0].value).to.be.eql("Superb");
  });

  it("should return the selectOption for all enum properties", () => {
    const name = "PaymentTerminalPost";
    const result = swaggerSchemaToUI(schema, name, {
      "PaymentTerminalPost.locationId": {
        options: [
          { key: "1", value: "Superb" },
          { key: "3", value: "Third" }
        ]
      }
    });
    expect(result.properties.locationId.selectedOption).to.be.eql("");
    expect(result.properties.protocol.selectedOption).to.be.eql("");
  });

  it("should return the proper selectOption for all enum properties when given a full schema", () => {
    const name = "PaymentTerminalPost";
    const model = {
      locationId: "3",
      protocol: "ws"
    };
    const result = swaggerSchemaToUI(schema, name, {
      "PaymentTerminalPost.locationId": {
        options: [
          { key: "1", value: "Superb" },
          { key: "3", value: "Third" }
        ]
      }
    }, null, model);
    expect(result.properties.locationId.selectedOption).to.be.eql({ key: "3", value: "Third" });
    expect(result.properties.protocol.selectedOption).to.be.eql({ key: 'ws', value: 'ws' });
  });

  it("should create the 'validations' for vuevalidate", () => {
    const name = "PaymentTerminalPost";
    const result = swaggerSchemaToUI(schema, name, null, "terminal");
    expect(result.validations).to.not.be.eql(undefined);
  });

  it("should return the right schema for lexiconKeys for a null model", () => {
    const modelName = "SeatFeePostData";
    const accountId = "accountId";
    const result = swaggerSchemaToUI(schema, modelName, null, "seatfees", null, accountId);

    expect(result.properties.lexiconKeys.required).to.contain("name");

    expect(result.properties.lexiconKeys.model.name.key).to.contain("name-accountId-");
    expect(result.properties.lexiconKeys.model.name.values).to.be.eql({"en-us": ""});

    expect(result.properties.lexiconKeys.properties).to.have.property("name");
    expect(result.properties.lexiconKeys.properties.name).to.have.property("properties");

    expect(result.properties.lexiconKeys.properties.name.properties).to.have.property("key");
    expect(result.properties.lexiconKeys.properties.name.properties).to.have.property("values");
    expect(result.properties.lexiconKeys.properties.name.properties.key.type).to.be.eql("string");
    expect(result.properties.lexiconKeys.properties.name.properties.values.properties).to.be.eql({
      'en-us': { type: 'string', description: 'The lexicon value for en-us' },
      'fr-fr': { type: 'string', description: 'The lexicon value for fr-fr' },
      'de-de': { type: 'string', description: 'The lexicon value for de-de' },
      'nl-nl': { type: 'string', description: 'The lexicon value for nl-nl' },
      'es-ar': { type: 'string', description: 'The lexicon value for es-ar' }
    });
  });

  it("should return the right schema for lexiconKeys for a null model", () => {
    const modelName = "SeatFeePostData";
    const accountId = "accountId";
    const model = {
      lexiconKeys: {
        name: {
          key: "some-saved-key"
        }
      }
    }
    const result = swaggerSchemaToUI(schema, modelName, null, "seatfees", model, accountId);

    expect(result.properties.lexiconKeys.model.name.key).to.contain("some-saved-key");
    expect(result.properties.lexiconKeys.model.name.values).to.be.eql({"en-us": ""});
  });  
});
