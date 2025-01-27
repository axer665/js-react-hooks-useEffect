import { useState, useEffect, Fragment } from "react";
import List from "../List/List";
import Details from "../Details/Details";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";

export default function MainPage() {
  const [list, setList] = useState([]);
  const [info, setInfo] = useState({ id: '', name: '' });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)

  const infoHandler = (info) => setInfo(info);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}users.json`)
      .then((request) => {
        return request;
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Something went wrong... 😬 on receiving the user list 🤓')
        }
        return response.json();
      })
      .then((users) => {
        setList(users);
        setLoading(false);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
        console.error(err);
      })
  }, []);

  return (
    <Fragment>
      {error && <Error />}
      <div className="app container">
        {loading ? <Loading /> : <List list={list} infoHandler={infoHandler} />}
        {info && <Details info={info} />}
      </div>
    </Fragment>
  )
}