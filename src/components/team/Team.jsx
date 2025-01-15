import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTeam, deleteTeam } from "../../app/features/team/teamApiSlice";
import { cloudImgUpload } from "../../helpers/cloudinary";
import CloudinaryImageUpload from "haq-cloudinary";

const Team = () => {
  const dispatch = useDispatch();
  const { team } = useSelector((state) => state.team);
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    name: "",
    skill: "",
    age: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCreateTeam = async (e) => {
    e.preventDefault();

    // const fileData = await cloudImgUpload({
    //   file: file,
    //   preset: "wq5ab9dj",
    //   cloudName: "dhcftpm1r",
    // });

    const fileData = await CloudinaryImageUpload({
      file: file,
      preset: "wq5ab9dj",
      cloudName: "dhcftpm1r",
    });

    dispatch(createTeam({ ...input, photo: fileData.secure_url }));

    e.target.reset();
  };

  const handleteamDelete = (id) => {
    dispatch(deleteTeam(id));
  };

  return (
    <div className="w-[1000px] mx-auto mt-[100px]">
      <div>
        <h2 className="text-3xl">Create New Team</h2>
        <form onSubmit={handleCreateTeam} className="p-5 shadow-md mb-5">
          <div className="my-3">
            <input
              type="text"
              className="p-3 outline-none border border-slate-200 w-[300px]"
              name="name"
              placeholder="Name"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              className="p-3 outline-none border border-slate-200 w-[300px]"
              name="skill"
              placeholder="Skill"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <input
              type="text"
              className="p-3 outline-none border border-slate-200 w-[300px]"
              name="age"
              placeholder="Age"
              onChange={handleInputChange}
            />
          </div>
          <div className="my-3">
            <input
              type="file"
              className="p-3 outline-none border border-slate-200 w-[300px]"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="mt-5">
            <button
              type="submit"
              className="p-2 bg-red-500 rounded-md text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
      <hr />
      <ul>
        {team.map((item) => {
          return (
            <li key={item.id} className="my-2">
              <img
                className="w-[80px] h-[80px] rounded-md object-cover"
                src={item.photo}
                alt=""
              />
              <h2 className="text-2xl font-bold">{item.name}</h2>
              <p>{item.skill}</p>
              <button
                onClick={() => handleteamDelete(item.id)}
                className="p-3 bg-red-500 rounded-sm"
              >
                X
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Team;
