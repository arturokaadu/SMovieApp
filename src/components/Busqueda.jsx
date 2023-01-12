import swal from "@sweetalert/with-react";
import { useNavigate } from "react-router-dom";
export const Busqueda = () => {
  const navigate = useNavigate();

  //fix this eventually. What if the movie name was 'it'? try it out
  const handleSubmit = (e) => {
    e.preventDefault();
    //trim so that it eliminates spaces on search
    const keyword = e.currentTarget.keyword.value.trim();
    //console.log(keyword);
    if (keyword.length < 2) {
      swal("You must write a keyword");
    } else {
      e.currentTarget.keyword.value = "";
      navigate(`/resultados?keyword=${keyword}`);
    }
  };

  return (
    <form className="d-flex align-items-center" onSubmit={handleSubmit}>
      <label className="form-label mb-0 mx-2">
        <input
          className="form-control"
          type="text"
          name="keyword"
          placeholder="Search for movies"
        />
      </label>
      <button className="btn btn-success ml-2" type="submit">
        Search
      </button>
    </form>
  );
};
