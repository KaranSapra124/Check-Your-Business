import React, { useState } from "react";
import { initializeApp } from "firebase/compat/app";

import { useLocation } from "react-router-dom";
import { getDatabase, ref, update, once, get } from "firebase/database";

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

const UpdateData = () => {
  const location = useLocation();
  const arr = location?.state;
  // console.log(arr);
  const Db = getDatabase();

  const [Title, setTitle] = useState(arr[0].Title);
  const [Desc, setDesc] = useState(arr[1].Desc);
  const [Quant, setQuant] = useState(arr[2].Quantity);
  const [Category, setCategory] = useState(arr[3].Category);

  const Update = async () => {
    const Dbref = ref(Db, `/product`);
    // console.log(Dbref.key);
    // once(Dbref, async (snapshot) => {
    const snapshot = await get(Dbref);
    const data = snapshot.val();
    if (data) {
      const products = Object.entries(data).map(([generatedId, value]) => ({
        generatedId,
        ...value
      }));
      const UpdatedData = {
        TitleVal: Title,
        QuantVal: Quant,
        CategoryVal: Category,
        DescVal: Desc
      };
      const UpdatedId = products[arr[4]].generatedId;
      const UpdatedRef = ref(Db, `product/${UpdatedId}`);
      await update(UpdatedRef, UpdatedData)
        .then(() => {
          return console.log("Updated successfully");
        })
        .catch((err) => {
          return console.log("Error while updating");
        });
    }
    // });
  };

  function HandleTitle(e) {
    setTitle(e.target.value);
  }
  function HandleDesc(e) {
    setDesc(e.target.value);
  }
  function HandleQuant(e) {
    setQuant(e.target.value);
  }
  function HandleCategory(e) {
    setCategory(e.target.value);
  }

  return (
    <>
      <div className="d-flex flex-column border p-5  ">
        <label>Title:</label>
        <input type="text" value={Title} onChange={HandleTitle} />
        <label>Description:</label>
        <input type="text" value={Desc} onChange={HandleDesc} />
        <label>Quantity:</label>

        <input type="number" value={Quant} onChange={HandleQuant} />
        <label>Category:</label>

        <input type="text" value={Category} onChange={HandleCategory} />
        <i
          className="fas fa-check btn btn-primary m-auto mt-2"
          onClick={Update}
        ></i>
      </div>
    </>
  );
};

export default UpdateData;
