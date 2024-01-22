import "./tbr.css";

const TBR = (props) => {
  //   const [userData, setUserData] = useState();

  useEffect(() => {
    document.title = "TBR";
    //     get(`/api/userdata`, { userid: props.userId }).then((userDataObj) => setUserData(userDataObj));
  }, []);

  return (
    <>
      <div>TBR</div>

      <a href="/profile/">
        <button>Back</button>
      </a>
    </>
  );
};

export default TBR;
