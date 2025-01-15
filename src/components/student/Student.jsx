import { BsTrash } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import Modal from "../modal/Modal";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  createStudent,
  deleteStudent,
  updateStudent,
} from "../../app/features/student/studentApiSlice";
import CloudinaryImageUpload from "haq-cloudinary";
import Loader from "../loader/Loader";
import {
  loaderStart,
  setMsgEmpty,
} from "../../app/features/student/studentSlice";
import { createAlert } from "../../helpers/alert";
import Swal from "sweetalert2";
import API from "../../helpers/api";

const Student = () => {
  const dispatch = useDispatch();
  const { students, loading, success, error } = useSelector(
    (state) => state.student
  );
  const [modal, setModal] = useState(false);
  const [single, setSingle] = useState(false);
  const [edit, setEdit] = useState(false);
  const [file, setFile] = useState(null);
  const [student, setStudent] = useState({});
  const [input, setInput] = useState({
    name: "",
    skill: "",
    age: "",
    location: "",
  });

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStudentCreate = async (e) => {
    e.preventDefault();

    dispatch(loaderStart());

    const fileData = await CloudinaryImageUpload({
      file: file,
      preset: "wq5ab9dj",
      cloudName: "dhcftpm1r",
    });

    dispatch(createStudent({ ...input, photo: fileData.secure_url }));

    setInput({
      name: "",
      skill: "",
      age: "",
      location: "",
    });
    setModal(false);
  };

  // Handle Student Delete
  const handelStudentDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteStudent(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  // handle single data
  const handleSingleData = (id) => {
    setStudent(students.find((data) => data.id == id));
    setSingle(true);
  };

  // handle edit student
  const handleEditStudent = (id) => {
    setInput(students.find((data) => data.id == id));
    setEdit(true);
  };

  // handle student update
  const handleStudentUpdate = async (e) => {
    e.preventDefault();

    dispatch(loaderStart());

    let photoUrl = input.photo;

    if (file) {
      const fileUpdate = await CloudinaryImageUpload({
        file: file,
        preset: "wq5ab9dj",
        cloudName: "dhcftpm1r",
      });

      photoUrl = fileUpdate.secure_url;
    }

    dispatch(updateStudent({ ...input, photo: photoUrl }));

    if (!loading) {
      Swal.fire({
        title: "Updated!",
        text: "Your file has been Updated.",
        icon: "success",
      });

      setEdit(false);
    }
  };

  useEffect(() => {
    if (success) {
      createAlert({
        title: success,
        icon: "success",
      });
      dispatch(setMsgEmpty());
    }

    if (error) {
      createAlert({
        title: error,
        icon: "error",
      });
      dispatch(setMsgEmpty());
    }
  }, [success, dispatch, error]);

  return (
    <div>
      <Loader isOn={loading} />
      <div className="flex justify-end">
        <button
          onClick={() => setModal(true)}
          className="py-2 px-5 bg-red-500 text-white rounded-md flex items-center gap-2"
        >
          Create new student
          <FaPlus />
        </button>
      </div>
      <hr className="my-3" />
      <Modal
        onClose={() => setModal(false)}
        isOpen={modal}
        title="Create new Student"
      >
        <form onSubmit={handleStudentCreate}>
          <label className="my-2 block">
            Name
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </label>

          <label className="my-2 block">
            Age
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="age"
              value={input.age}
              onChange={handleInputChange}
            />
          </label>

          <label className="my-2 block">
            Skill
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="skill"
              value={input.skill}
              onChange={handleInputChange}
            />
          </label>

          <label className="my-2 block">
            Location
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="location"
              value={input.location}
              onChange={handleInputChange}
            />
          </label>

          <label className="my-2 block">
            Photo
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <button
            type="submit"
            className="mt-3 w-full py-3 px-4 bg-red-500 text-white rounded-md"
          >
            Create Now
          </button>
        </form>
      </Modal>

      <Modal
        onClose={() => setSingle(false)}
        isOpen={single}
        title="Single Student"
      >
        <img src={student?.photo} alt="" />
        <h1>{student?.name}</h1>
        <p>{student?.skill}</p>
      </Modal>
      <Modal
        onClose={() => setEdit(false)}
        isOpen={edit}
        title="Update Student Data"
      >
        <form onSubmit={handleStudentUpdate}>
          <label className="my-2 block">
            Name
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="name"
              value={input.name}
              onChange={handleInputChange}
            />
          </label>

          <input
            type="hidden"
            className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            name="id"
            value={input.id}
          />

          <label className="my-2 block">
            Age
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="age"
              value={input.age}
              onChange={handleInputChange}
            />
          </label>

          <label className="my-2 block">
            Skill
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="skill"
              value={input.skill}
              onChange={handleInputChange}
            />
          </label>

          <label className="my-2 block">
            Location
            <input
              type="text"
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
              name="location"
              value={input.location}
              onChange={handleInputChange}
            />
          </label>
          <label>
            <img src={input.photo} alt="" />
            <input type="hidden" value={input.photo} name="photo" />
          </label>

          <label className="my-2 block">
            Photo
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="border p-2 border-slate-300 outline-none rounded-sm block w-full"
            />
          </label>
          <button
            type="submit"
            className="mt-3 w-full py-3 px-4 bg-red-500 text-white rounded-md"
          >
            Update Now
          </button>
        </form>
      </Modal>
      <div className=" bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4">
          <h1 className="text-2xl font-bold text-gray-700">Responsive Table</h1>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700 uppercase">
                <th className="px-6 py-3 border-b border-gray-200">#</th>
                <th className="px-6 py-3 border-b border-gray-200">Name</th>
                <th className="px-6 py-3 border-b border-gray-200">Age</th>
                <th className="px-6 py-3 border-b border-gray-200">Skill</th>
                <th className="px-6 py-3 border-b border-gray-200">Location</th>
                <th className="px-6 py-3 border-b border-gray-200">Photo</th>
                <th className="px-6 py-3 border-b border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((item, index) => {
                return (
                  <tr
                    key={item.id}
                    className={`hover:bg-gray-100 text-gray-700 ${
                      (index + 1) % 2 == 0 ? "bg-gray-50" : ""
                    }`}
                  >
                    <td className="px-6 py-4 border-b border-gray-200">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {item.name}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {item.age}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {item.skill}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      {item.location}
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <img
                        className="w-[60px] h-[60px] object-cover rounded-full"
                        src={item.photo}
                        alt=""
                      />
                    </td>
                    <td className="px-6 py-4 border-b border-gray-200">
                      <button
                        onClick={() => handleSingleData(item.id)}
                        className="p-3 text-blue-500"
                      >
                        <IoEyeOutline />
                      </button>
                      <button
                        onClick={() => handleEditStudent(item.id)}
                        className="p-3 text-yellow-500"
                      >
                        <FiEdit />
                      </button>
                      <button
                        onClick={() => handelStudentDelete(item.id)}
                        className="p-3 text-red-500"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {/* <tr className="bg-gray-50 hover:bg-gray-100 text-gray-700">
                <td className="px-6 py-4 border-b border-gray-200">2</td>
                <td className="px-6 py-4 border-b border-gray-200">
                  Jane Smith
                </td>
                <td className="px-6 py-4 border-b border-gray-200">
                  jane@example.com
                </td>
                <td className="px-6 py-4 border-b border-gray-200">Editor</td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Student;
