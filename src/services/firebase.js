import { initializeApp } from "firebase/app";
import {getFirestore, collection, getDocs, getDoc, doc, where, query, addDoc, orderBy, Firestore, writeBatch} from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyB7gar3oIGJOQpN5PBVkIkV0yJkMLZv7Zo",
    authDomain: "react-app2-56b98.firebaseapp.com",
    projectId: "react-app2-56b98",
    storageBucket: "react-app2-56b98.appspot.com",
    messagingSenderId: "13600140283",
    appId: "1:13600140283:web:74c512c4ee54bb6695395e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function getProducts(){
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    const products = snapshot.docs.map((elem) => ({...elem.data(), id: elem.id}));
    return products;
}

export async function getProductsById(id){
    const productsRef = collection(db, "products");
    const docRef = doc(productsRef, id);
    const snapshot = await getDoc(docRef);
    return {...snapshot.data(), id: snapshot.id};
}

export async function getProductsByCategory(category){
    const productsRef = collection(db, "products");
    const queryResponse = query(productsRef, where("category", "==", category));
    const snapshot = await getDocs(queryResponse);
    const products = snapshot.docs.map((elem) =>({...elem.data(), id: elem.id}));
    return products;
}

export async function getProductByKeyword(keyword) {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);
    let newArrayProducts = [];
    snapshot.forEach((doc) =>{
        let product = doc.data();
        product.id = doc.id;
        if(product.title.includes(keyword) || product.detail.includes(keyword)){
            newArrayProducts.push(product);
        }
    });
    return newArrayProducts;
}

export async function createOrder(order) {
    const orderRef = collection(db, "order");

    let respuesta = await addDoc(orderRef, order);

    return respuesta.id;
}

export async function exportArrayWithBatch() {
const products = [
    {id:1, category:"clothing", img:"/img/clothing/shirt.png", title:"shirt" ,price:500 ,detail:"shirt coderhouse",stock: 20, discount: 23},
    {id:2, category:"clothing", img:"/img/clothing/pants.png", title:"pants" ,price:900 ,detail:"pants coderhouse",stock:100},
    {id:3, category:"clothing", img:"/img/clothing/shoes.png", title:"shoes" ,price:1500 ,detail:"shoes coderhouse",stock:98},
    {id:4, category:"clothing", img:"/img/clothing/cap.png", title:"cap" ,price:800 ,detail:"cap coderhouse",stock:71},
    {id:5, category:"clothing", img:"/img/clothing/dress.png", title:"dress" ,price:8800 ,detail:"dress coderhouse",stock:5},
    {id:6, category:"clothing", img:"/img/clothing/boots.png", title:"boots" ,price:1999 ,detail:"boots coderhouse",stock:8},
    {id:7, category:"clothing", img:"/img/clothing/jacket.png", title:"jacket" ,price:1100 ,detail:"jacket coderhouse",stock:28},
    {id:8, category:"clothing", img:"/img/clothing/scarf.png", title:"scarf" ,price:1200 ,detail:"scarf coderhouse",stock:68},
    {id:9, category:"clothing", img:"/img/clothing/heels.png", title:"heels" ,price:7000 ,detail:"heels coderhouse",stock:88},
    {id:10, category:"clothing", img:"/img/clothing/sandals.png", title:"sandals" ,price:3000 ,detail:"sandals coderhouse",stock:28},
    {id:11, category:"clothing", img:"/img/clothing/shorts.png", title:"shorts" ,price:2600 ,detail:"shorts coderhouse",stock:38},

    {id:12, category:"technology", img:"/img/technology/headphones.png", title:"headphones" ,price:11500 ,detail:"headphones coderhouse",stock:22},
    {id:13, category:"technology", img:"/img/technology/keyboard.png", title:"keyboard" ,price:6300 ,detail:"keyboard coderhouse",stock:7},
    {id:14, category:"technology", img:"/img/technology/mouse.png", title:"mouse" ,price:8200 ,detail:"mouse coderhouse",stock:3},
    {id:15, category:"technology", img:"/img/technology/mousepad.png", title:"mousepad" ,price:4000 ,detail:"mousepad coderhouse",stock:2},
    {id:16, category:"technology", img:"/img/technology/monitor.png", title:"monitor" ,price:40000 ,detail:"monitor coderhouse",stock:11},
    {id:17, category:"technology", img:"/img/technology/printer.png", title:"printer" ,price:50000 ,detail:"printer coderhouse",stock:13},
    {id:18, category:"technology", img:"/img/technology/microphone.png", title:"microphone" ,price:2000 ,detail:"microphone coderhouse", discount: 16,stock:500},
    {id:19, category:"technology", img:"/img/technology/speakers.png", title:"speakers" ,price:3000 ,detail:"speakers coderhouse", stock:220},
    {id:20, category:"technology", img:"/img/technology/pendrive.png", title:"pendrive" ,price:1500 ,detail:"pendrive coderhouse",stock:330},
    {id:21, category:"technology", img:"/img/technology/webcam.png", title:"webcam" ,price:3000 ,detail:"webcam coderhouse",stock:100},
    {id:22, category:"technology", img:"/img/technology/scanner.png", title:"scanner" ,price:35000 ,detail:"scanner coderhouse",stock:11},

    {id:23, category:"supermarket", img:"/img/supermarket/cookies.png", title:"cookies" ,price:50 ,detail:"cookies coderhouse",stock:60},
    {id:24, category:"supermarket", img:"/img/supermarket/soda.png", title:"soda" ,price:80 ,detail:"soda coderhouse",stock:30},
    {id:25, category:"supermarket", img:"/img/supermarket/milk.png", title:"milk" ,price:110 ,detail:"milk coderhouse",stock:36},
    {id:26, category:"supermarket", img:"/img/supermarket/chips.png", title:"chips" ,price:30 ,detail:"chips coderhouse",stock:19},
    {id:27, category:"supermarket", img:"/img/supermarket/yogurt.png", title:"yogurt" ,price:150 ,detail:"yogurt coderhouse",stock:60},
    {id:28, category:"supermarket", img:"/img/supermarket/flour.png", title:"flour" ,price:200 ,detail:"flour coderhouse",stock:61},
    {id:29, category:"supermarket", img:"/img/supermarket/icecream.png", title:"icecream" ,price:70 ,detail:"icecream coderhouse",stock:250},
    {id:30, category:"supermarket", img:"/img/supermarket/eggs.png", title:"eggs" ,price:100 ,detail:"eggs coderhouse",stock:30},
    {id:31, category:"supermarket", img:"/img/supermarket/juice.png", title:"juice" ,price:40 ,detail:"juice coderhouse", discount: 25,stock:700},
    {id:32, category:"supermarket", img:"/img/supermarket/butter.png", title:"butter" ,price:90 ,detail:"butter coderhouse",stock:66},
    {id:33, category:"supermarket", img:"/img/supermarket/cheese.png", title:"cheese" ,price:130 ,detail:"cheese coderhouse",stock:40},

    ];

    const batch = writeBatch(db);

    for (let item of products) {
        item.index = item.id;
        delete item.id;

        const collectionRef = collection(db, "products");
        const newDoc = doc(collectionRef);

        batch.set(newDoc, item);
    }

    batch.commit().then(() => console.log("batch listo"));
}

export default db;