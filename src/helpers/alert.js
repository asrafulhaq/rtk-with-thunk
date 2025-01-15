import Swal from "sweetalert2";

/**
 * Create a Success or Error Alert
 */
export const createAlert = ({ title, icon = "error", position = "center" }) => {
  Swal.fire({
    position: position,
    icon: icon,
    title: title,
    showConfirmButton: false,
    timer: 3000,
  });
};
