// To parse this data:
//
//   import { Convert } from "./file";
//
//   const allorder = Convert.toAllorder(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Allorder {
    shippingAddress:   ShippingAddress;
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: PaymentMethodType;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              User;
    cartItems:         CartItem[];
    paidAt?:           Date;
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
}

export interface CartItem {
    count:   number;
    _id:     string;
    product: Product;
    price:   number;
}

export interface Product {
    subcategory:     Brand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    imageCover:      string;
    category:        Brand;
    brand:           Brand;
    ratingsAverage:  number;
    id:              string;
}

export interface Brand {
    _id:       ID;
    name:      BrandName;
    slug:      Slug;
    image?:    string;
    category?: ID;
}

export enum ID {
    The6407F1Bcb575D3B90Bf95797 = "6407f1bcb575d3b90bf95797",
    The6407F243B575D3B90Bf957AC = "6407f243b575d3b90bf957ac",
    The6407F3A8B575D3B90Bf957E2 = "6407f3a8b575d3b90bf957e2",
    The64089Bbe24B25627A253158B = "64089bbe24b25627a253158b",
    The64089C3924B25627A2531593 = "64089c3924b25627a2531593",
    The64089D5C24B25627A253159F = "64089d5c24b25627a253159f",
    The64089D9E24B25627A25315A5 = "64089d9e24b25627a25315a5",
    The64089Dc924B25627A25315A8 = "64089dc924b25627a25315a8",
    The64089F5824B25627A25315C7 = "64089f5824b25627a25315c7",
    The6439D2D167D9Aa4Ca970649F = "6439d2d167d9aa4ca970649f",
    The6439D58A0049Ad0B52B9003F = "6439d58a0049ad0b52b9003f",
    The6439D5B90049Ad0B52B90048 = "6439d5b90049ad0b52b90048",
}

export enum BrandName {
    Adidas = "Adidas",
    DeFacto = "DeFacto",
    Electronics = "Electronics",
    JackJones = "Jack & Jones",
    LCWaikiki = "LC Waikiki",
    LaptopsAccessories = "Laptops & Accessories",
    MenSClothing = "Men's Clothing",
    MenSFashion = "Men's Fashion",
    Puma = "Puma",
    Sony = "SONY",
    WomenSClothing = "Women's Clothing",
    WomenSFashion = "Women's Fashion",
}

export enum Slug {
    Adidas = "adidas",
    Defacto = "defacto",
    Electronics = "electronics",
    JackAndJones = "jack-and-jones",
    LaptopsAndAccessories = "laptops-and-accessories",
    LcWaikiki = "lc-waikiki",
    MenSClothing = "men's-clothing",
    MenSFashion = "men's-fashion",
    Puma = "puma",
    Sony = "sony",
    WomenSClothing = "women's-clothing",
    WomenSFashion = "women's-fashion",
}

export enum PaymentMethodType {
    Card = "card",
    Cash = "cash",
}

export interface ShippingAddress {
    details: string;
    phone:   string;
    city:    string;
}

export interface User {
    _id:   UserID;
    name:  UserName;
    email: Email;
    phone: string;
}

export enum UserID {
    The65C2A844093Eaa4Bd6751375 = "65c2a844093eaa4bd6751375",
}

export enum Email {
    GehadHotmailCOM = "gehad@hotmail.com",
}

export enum UserName {
    Gehad = "gehad",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toAllorder(json: string): Allorder[] {
        return cast(JSON.parse(json), a(r("Allorder")));
    }

    public static allorderToJson(value: Allorder[]): string {
        return JSON.stringify(uncast(value, a(r("Allorder"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Allorder": o([
        { json: "shippingAddress", js: "shippingAddress", typ: r("ShippingAddress") },
        { json: "taxPrice", js: "taxPrice", typ: 0 },
        { json: "shippingPrice", js: "shippingPrice", typ: 0 },
        { json: "totalOrderPrice", js: "totalOrderPrice", typ: 0 },
        { json: "paymentMethodType", js: "paymentMethodType", typ: r("PaymentMethodType") },
        { json: "isPaid", js: "isPaid", typ: true },
        { json: "isDelivered", js: "isDelivered", typ: true },
        { json: "_id", js: "_id", typ: "" },
        { json: "user", js: "user", typ: r("User") },
        { json: "cartItems", js: "cartItems", typ: a(r("CartItem")) },
        { json: "paidAt", js: "paidAt", typ: u(undefined, Date) },
        { json: "createdAt", js: "createdAt", typ: Date },
        { json: "updatedAt", js: "updatedAt", typ: Date },
        { json: "id", js: "id", typ: 0 },
        { json: "__v", js: "__v", typ: 0 },
    ], false),
    "CartItem": o([
        { json: "count", js: "count", typ: 0 },
        { json: "_id", js: "_id", typ: "" },
        { json: "product", js: "product", typ: r("Product") },
        { json: "price", js: "price", typ: 0 },
    ], false),
    "Product": o([
        { json: "subcategory", js: "subcategory", typ: a(r("Brand")) },
        { json: "ratingsQuantity", js: "ratingsQuantity", typ: 0 },
        { json: "_id", js: "_id", typ: "" },
        { json: "title", js: "title", typ: "" },
        { json: "imageCover", js: "imageCover", typ: "" },
        { json: "category", js: "category", typ: r("Brand") },
        { json: "brand", js: "brand", typ: r("Brand") },
        { json: "ratingsAverage", js: "ratingsAverage", typ: 3.14 },
        { json: "id", js: "id", typ: "" },
    ], false),
    "Brand": o([
        { json: "_id", js: "_id", typ: r("ID") },
        { json: "name", js: "name", typ: r("BrandName") },
        { json: "slug", js: "slug", typ: r("Slug") },
        { json: "image", js: "image", typ: u(undefined, "") },
        { json: "category", js: "category", typ: u(undefined, r("ID")) },
    ], false),
    "ShippingAddress": o([
        { json: "details", js: "details", typ: "" },
        { json: "phone", js: "phone", typ: "" },
        { json: "city", js: "city", typ: "" },
    ], false),
    "User": o([
        { json: "_id", js: "_id", typ: r("UserID") },
        { json: "name", js: "name", typ: r("UserName") },
        { json: "email", js: "email", typ: r("Email") },
        { json: "phone", js: "phone", typ: "" },
    ], false),
    "ID": [
        "6407f1bcb575d3b90bf95797",
        "6407f243b575d3b90bf957ac",
        "6407f3a8b575d3b90bf957e2",
        "64089bbe24b25627a253158b",
        "64089c3924b25627a2531593",
        "64089d5c24b25627a253159f",
        "64089d9e24b25627a25315a5",
        "64089dc924b25627a25315a8",
        "64089f5824b25627a25315c7",
        "6439d2d167d9aa4ca970649f",
        "6439d58a0049ad0b52b9003f",
        "6439d5b90049ad0b52b90048",
    ],
    "BrandName": [
        "Adidas",
        "DeFacto",
        "Electronics",
        "Jack & Jones",
        "LC Waikiki",
        "Laptops & Accessories",
        "Men's Clothing",
        "Men's Fashion",
        "Puma",
        "SONY",
        "Women's Clothing",
        "Women's Fashion",
    ],
    "Slug": [
        "adidas",
        "defacto",
        "electronics",
        "jack-and-jones",
        "laptops-and-accessories",
        "lc-waikiki",
        "men's-clothing",
        "men's-fashion",
        "puma",
        "sony",
        "women's-clothing",
        "women's-fashion",
    ],
    "PaymentMethodType": [
        "card",
        "cash",
    ],
    "UserID": [
        "65c2a844093eaa4bd6751375",
    ],
    "Email": [
        "gehad@hotmail.com",
    ],
    "UserName": [
        "gehad",
    ],
};
