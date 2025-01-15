const Loader = ({ isOn }) => {
  if (!isOn) {
    return null;
  }
  return (
    <div
      style={{ zIndex: "99999999999999999" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
    >
      <img src="https://media.tenor.com/_62bXB8gnzoAAAAj/loading.gif" alt="" />
    </div>
  );
};

export default Loader;
