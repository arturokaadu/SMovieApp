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
    <form className="d-flex align-items-center searchbar" onSubmit={handleSubmit}>
      <label className="form-label mb-0 mx-2">
        <input
          className="form-control"
          type="text"
          name="keyword"
          placeholder="Search Anime"
        />
      </label>
      <button className="btn btn-success ml-2" type="submit">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zM9.5 14C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </button>
    </form>
  );
};
