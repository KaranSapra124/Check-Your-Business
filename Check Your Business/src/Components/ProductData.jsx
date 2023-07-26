import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/compat/app";
// import firebase from "firebase/compat/app";
import { Link, useLocation } from "react-router-dom";
import { getDatabase, ref, onValue, remove } from "firebase/database";
import {
  getStorage,
  ref as StorageRef,
  getDownloadURL,
  deleteObject
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

const ProductData = () => {
  const location = useLocation();
  const EmailValue = location?.state;
  // console.log(EmailValue);
  const Data_Base = getDatabase();
  const StorageDb = getStorage();
  const [ProductArr, setProductArr] = useState([]);
  const [EmailVal, setEmailVal] = useState("");
  // const [EmailVal, setEmailVal] = useState("");

  const EmailInp = (e) => {
    setEmailVal(e.target.value);
  };

  const EmailSubmit = () => {
    console.log("Submitted");

    return setEmailVal(EmailVal);
  };

  const ClickMe = (Id, Title) => {
    // console.log(Id, Title);

    const Dbref = ref(Data_Base, `/product`);
    // console.log(Dbref.key);
    onValue(Dbref, async (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const products = Object.entries(data).map(([generatedId, value]) => ({
          generatedId,
          ...value
        }));
        products.map(async (elem) => {
          if (products.length !== 0) {
            if (elem.TitleVal === Title) {
              const filenamewithparams = new URL(elem.ImgSrc).pathname
                .split("%2F")
                .pop();
              const filename = filenamewithparams.split("?")[0];
              console.log(filename);

              const StoragePath = StorageRef(
                StorageDb,
                `product_Img/${filename}`
              );

              deleteObject(StoragePath)
                .then(() => {
                  return console.log("Successfully deleted from storage");
                })
                .catch((err) => {
                  return console.log("Error while deleting from storage");
                });

              const PathElem = ref(Data_Base, `/product/${elem.generatedId}`);
              await remove(PathElem)
                .then(() => {
                  return console.log("Deleted Id", elem.generatedId);
                })
                .catch((err) => {
                  return console.log("Error while deleting", err);
                });
            }
          }

          return;
        });
      }
    });
  };
  useEffect(() => {
    // setEmailVal(EmailValue);

    const Db = getDatabase();
    // const StorageDB = getStorage();

    const ProductRef = ref(Db, "product");
    const FetchData = async () => {
      onValue(ProductRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const products = Object.values(data).filter(
            (value) => typeof value === "object"
          );
          products.map((elem) => {
            if (
              elem.EmailValue === EmailValue ||
              elem.EmailValue === EmailVal
            ) {
              return setProductArr(products);
            }
            return setProductArr([]);
          });
        }
      });
    };

    FetchData();
  }, [EmailValue, EmailVal]);
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center">
      {ProductArr.length > 0 ? (
        ProductArr.map((value, index) => (
          <div
            className="card m-2 "
            key={index}
            style={{ width: "18rem", height: "fit-content" }}
          >
            {/* {console.log(index)} */}
            <img
              src={value.ImgSrc}
              alt="Card img cap"
              className="p-2 rounded"
              style={{ height: "15rem" }}
            />
            <div className="card-body">
              <h5 className="card-title">{value.TitleVal}</h5>
              <p className="card-text">{value.DescVal}</p>
              <h5 className="card-title">{value.QuantVal}</h5>
              <h5 className="card-title">{value.CategoryVal}</h5>
              {/* <button> */}
              <i
                onClick={() => {
                  ClickMe(index, value.TitleVal);
                }}
                className="fas fa-trash btn btn-danger"
              ></i>
              <Link
                to="/UpdateData"
                state={[
                  { Title: value.TitleVal },
                  { Desc: value.DescVal },
                  { Quantity: value.QuantVal },
                  { Category: value.CategoryVal },
                  index
                ]}
              >
                <i className="fas fa-pen btn btn-primary mx-2"></i>
              </Link>
              {/* </button> */}
            </div>
          </div>
        ))
      ) : (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h1 className="text-center">
            Nothing to show,Enter your mail again to show products again!!!
          </h1>
          <input
            type="email"
            placeholder="Enter the login email..."
            onChange={EmailInp}
            value={EmailVal}
          />
          <button
            onClick={EmailSubmit}
            className="btn btn-primary mt-2  fa-solid fa-magnifying-glass"
          ></button>
        </div>
      )}
    </div>
  );
};

export default ProductData;
