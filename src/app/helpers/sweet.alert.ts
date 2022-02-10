import Swal from 'sweetalert2';
const color = '#f44336';

class SweetAlert {
  public alertSuccess = (message: string, redirect: any) => {
    Swal.fire({
      title: '¡Éxito!',
      icon: 'success',
      text: message,
      confirmButtonColor: color,
      timer: 2000,
      didOpen: () => {},
    }).then(() => {
      redirect();
    });
  };

  public alertInput = (title: string, func: any, code?: any) => {
    Swal.fire({
      title,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      confirmButtonColor: color,
      preConfirm: (login) => {
        console.log(login);
        if (login.length == '') {
          Swal.showValidationMessage('Debe ingresar el código del pallet');
        }
        return login;
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        func(result.value, code);
      }
    });
  };

  public alertLoading = () => {
    Swal.fire({
      title: 'Cargando...',
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  public alertError = (message: string) => {
    Swal.fire({
      title: '¡Error!',
      icon: 'error',
      text: message,
      confirmButtonColor: color,
      // timer: 2000,
      didOpen: () => {},
    });
  };

  public alertWarning = (message: string) => {
    Swal.fire({
      title: '¡Advertencia!',
      icon: 'warning',
      text: message,
      confirmButtonColor: color,
      // timer: 2000,
      didOpen: () => {},
    });
  };

  public alertQuestion = (redirect: any) => {
    Swal.fire({
      title: '¿Está seguro?',
      text: 'Esta acción es irreversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: color,
      cancelButtonColor: '#6e7d88',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        redirect();
      }
    });
  };

  public alertQuestionComplete = (title: string, text: string, redirect: any) => {
    Swal.fire({
      title,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: color,
      cancelButtonColor: '#6e7d88',
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        redirect();
      }
    });
  };

  public alertQuestionText = (question: string, text: string, redirect: any) => {
    Swal.fire({
      title: question,
      text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: color,
      cancelButtonColor: '#6e7d88',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        redirect();
      }
    });
  };

  cerrarAlert = () => {
    Swal.close();
  };
}

export default SweetAlert;
