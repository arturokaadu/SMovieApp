export const Footer = () => {
  return (
    <div>
      <footer className="text-center text-white">
        <div className="container pt-4">
          <section className="mb-4">
            <a
              className="btn btn-link btn-floating btn-lg text-dark m-1"
              href="#!"
              role="button"
              data-mdb-ripple-color="dark"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
          </section>
        </div>

        <div className="text-center text-dark p-3">
          © 2022 Copyright:
          <a className="text-dark" href="https://mdbootstrap.com/">
            Arturo Kaadú
          </a>
        </div>
      </footer>
    </div>
  );
};
