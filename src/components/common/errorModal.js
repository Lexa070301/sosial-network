import Swal from "sweetalert2";

export const swal = (error) => Swal.fire({
  title: 'Error!',
  text: error,
  icon: 'error',
  confirmButtonText: ':('
})
