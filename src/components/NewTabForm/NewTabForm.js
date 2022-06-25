import { ref, update } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import notFoundImage from "../../images/no-image.png";
import { db } from "../../firebase-config";
import { getBreedsList, getRandomDogImageByBreed } from "../../helpers/api";
import AuthContext from "../../store/auth-context";
import classes from "./NewTabForm.module.css";
import { useNavigate } from "react-router-dom";

const defaultSelectOption = "Select breed";

const writePostData = async ({
  email,
  id,
  imageUrl,
  description,
  date,
  uid,
}) => {
  const postData = {
    imageUrl,
    email,
    id,
    description,
    date,
    uid,
  };

  const updates = {};
  updates["/posts/" + id] = postData;

  await update(ref(db), updates);
};

const NewTabForm = () => {
  const [breedsList, setBreedsList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(defaultSelectOption);
  const [selectedDogImageSrc, setSelectedDogImageSrc] = useState(notFoundImage);
  const [textareaValue, setTextareaValue] = useState("");
  const history = useNavigate();

  const authCtx = useContext(AuthContext);
  const { user } = authCtx;

  const selectBreedHandler = (event) => {
    setSelectedBreed(event.target.value);
    randomizeImageHandler(null, event.target.value);
  };

  const randomizeImageHandler = async (event, value = undefined) => {
    const { message, status } = await getRandomDogImageByBreed(
      value || selectedBreed
    );
    if (status === "success") {
      setSelectedDogImageSrc(message);
    }
  };

  const setTextareaValueHandler = (event) => {
    setTextareaValue(event.target.value);
  };

  const createPostHandler = async () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date().toLocaleDateString("en-US", options);

    try {
      await writePostData({
        email: user.email,
        id: "" + Math.floor(Math.random() * 1000000) + 1,
        uid: user.uid,
        date,
        imageUrl: selectedDogImageSrc,
        description: textareaValue,
      });
    } catch (error) {
      console.log(error);
    }
    history("/");
  };

  const submitHandler = (event) => {
    event.preventDefault();
    createPostHandler();
  };

  const fetchBreeds = async () => {
    const { message, status } = await getBreedsList();
    if (status === "success") {
      setBreedsList(Object.keys(message));
    }
  };

  useEffect(() => {
    fetchBreeds();
  }, []);

  return (
    <div className={classes.wrapper}>
      <section className={classes.starting}>
        <h1>Create your own Doggie!</h1>
      </section>

      <section className={classes.main}>
        <form onSubmit={submitHandler}>
          <div className={classes.form}>
            <div className={classes.description}>
              <h2 className={classes.subtitle}>
                Describe your dog in a few words
              </h2>
              <textarea
                required
                value={textareaValue}
                onChange={setTextareaValueHandler}
              />
            </div>
            <div>
              <h2 className={classes.subtitle}>
                Select dog breed and randomize an image
              </h2>
              <select
                className={classes.select}
                value={selectedBreed}
                onChange={selectBreedHandler}
              >
                <option disabled value={defaultSelectOption}>
                  {defaultSelectOption}
                </option>
                {breedsList.map((item) => (
                  <option value={item} key={item}>
                    {item.toUpperCase()}
                  </option>
                ))}
              </select>
              <button
                disabled={selectedBreed === defaultSelectOption}
                onClick={randomizeImageHandler}
                className={classes.button}
                type="button"
              >
                Randomize image
              </button>
              <div className={classes.image}>
                <img src={selectedDogImageSrc} alt="dog" />
              </div>
            </div>
          </div>
          <div className={classes.submit}>
            <button type="submit" className={classes.button}>
              Submit Form
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default NewTabForm;
