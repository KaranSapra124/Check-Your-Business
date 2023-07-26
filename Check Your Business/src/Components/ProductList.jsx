import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { initializeApp } from "firebase/compat/app";
// import { app, Fbconfig } from "./FireBase/FireDb";
import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import {
  getStorage,
  ref as StorageRef,
  getDownloadURL
} from "firebase/storage";

const Fbconfig = {
  apiKey: "AIzaSyA8eB8xt1cDdwSyGIIDs1LinRu4hpHOH5I",
  authDomain: "productinventory-3b07d.firebaseapp.com",
  databaseURL:
    "https://productinventory-3b07d-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "productinventory-3b07d",
  storageBucket: "productinventory-3b07d.appspot.com",
  messagingSenderId: "17848299694",
  appId: "1:17848299694:web:b682fab5dbcd78cae5bd3f"
};

initializeApp(Fbconfig);

const ProductList = () => {
  const location = useLocation();
  const EmailValue = location?.state?.EmailVal || "";
  // console.log(EmailValue);

  const [selectedImage, setSelectedImage] = useState(null);
  const [TitleVal, setTitleVal] = useState("");
  const [DescVal, setDescVal] = useState("");
  const [QuantVal, setQuantVal] = useState("");
  const [CategoryVal, setCategoryVal] = useState("");
  // const [ImgSrc, setImgSrc] = useState("");
  // const [RandomVal, setRandomVal] = useState("");
  var ImgSrc = "";
  const AddProduct = () => {
    const db = firebase.database().ref("product");
    const StorageDb = firebase.storage().ref("product_Img");
    const Storage_DB = getStorage();

    if (selectedImage) {
      // selectedImage.name = TitleVal;
      // console.log(selectedImage);

      const fileRef = StorageDb.child(selectedImage.name);
      fileRef
        .put(selectedImage)
        .then(async () => {
          console.log("Image uploaded successfully");
          // const StorageArr = StorageRef(Storage_DB, `/product_Img/`);
          await getDownloadURL(
            StorageRef(Storage_DB, `/product_Img/${selectedImage.name}`)
          )
            .then((url) => {
              // console.log(url.name);
              ImgSrc = url;
              console.log("URL Extracted", ImgSrc);
              const filenamewithparams = new URL(url).pathname
                .split("%2F")
                .pop();
              const filename = filenamewithparams.split("?")[0];
              console.log(filename);
              // }
            })
            .catch((err) => {
              return console.log("Error while uploading : ", err);
            });
          const Product = {
            TitleVal,
            DescVal,
            QuantVal,
            CategoryVal,
            ImgSrc,
            EmailValue
          };
          db.push(Product)
            .then(() => {
              setTitleVal("");
              setDescVal("");
              setCategoryVal("");
              setQuantVal("");
              return console.log("Added Successfully");
            })
            .catch((err) => {
              return console.log("Error While Adding : ", err);
            });
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }
  };

  const HandleTitle = (e) => {
    setTitleVal(e.target.value);
  };
  const HandleDesc = (e) => {
    setDescVal(e.target.value);
  };
  const HandleQuant = (e) => {
    setQuantVal(e.target.value);
  };
  const HandleCategory = (e) => {
    setCategoryVal(e.target.value);
  };
  const HandleImg = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      const reader = new FileReader();
      reader.onload = () => {
        // Read the image file and set it as the source of the image preview
        const dataURL = reader.result;
        document.getElementById("imagePreview").src = dataURL;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="bg-dark text-light container d-flex flex-column border rounded p-2 mt-2">
        <label>Product Image:</label>
        <input type="file" onChange={HandleImg} />
        <img
          id="imagePreview"
          alt="Preview"
          style={{ width: "200px", height: "200px" }}
        />

        <label>Product Title : </label>
        <input
          className="rounded"
          type="text"
          placeholder="Enter the title..."
          onChange={HandleTitle}
          value={TitleVal}
        />
        <label>Product Description : </label>
        <textarea
          className="rounded"
          onChange={HandleDesc}
          value={DescVal}
          cols="30"
          rows="3"
          placeholder="Enter the details..."
        ></textarea>
        <label>Product Stock : </label>
        <input
          className="rounded"
          onChange={HandleQuant}
          value={QuantVal}
          type="number"
          placeholder="Enter the Stock..."
        />
        <label>Category :</label>
        <input
          className="rounded"
          onChange={HandleCategory}
          value={CategoryVal}
          type="text"
          placeholder="Enter the Category..."
        />
        <button onClick={AddProduct} className="btn btn-primary m-auto mt-2">
          Add
        </button>
        {/* {console.log(EmailValue, "EmailId")} */}

        <Link
          to="/ProductData"
          state={EmailValue}
          className="btn btn-success m-auto mt-2"
        >
          Product List
        </Link>
      </div>
    </>
  );
};

export default ProductList;
