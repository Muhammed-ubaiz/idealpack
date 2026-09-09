import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.min.css'
import './alerts.css'

/**
 * Shared SweetAlert2 helpers for the whole Ideal Pack site.
 *
 * Every dialog on the site goes through this module so success / error /
 * warning / confirm / loading states all look and behave the same way.
 * Styling lives in ./alerts.css (customClass hooks below).
 */
const base = Swal.mixin({
  buttonsStyling: false,
  reverseButtons: true,
  customClass: {
    popup: 'ip-swal-popup',
    title: 'ip-swal-title',
    htmlContainer: 'ip-swal-text',
    actions: 'ip-swal-actions',
    confirmButton: 'ip-swal-confirm',
    cancelButton: 'ip-swal-cancel',
  },
  showClass: { popup: 'ip-swal-show' },
  hideClass: { popup: 'ip-swal-hide' },
})

/** Success feedback for a completed action. */
export function alertSuccess(title = 'Success!', text = '') {
  return base.fire({ icon: 'success', title, text, confirmButtonText: 'OK' })
}

/** Error feedback for a failed action. Pass a safe backend message when available. */
export function alertError(
  title = 'Something Went Wrong',
  text = 'Please try again or contact our team for assistance.',
) {
  return base.fire({ icon: 'error', title, text, confirmButtonText: 'OK' })
}

/** Warning for incomplete / invalid input. Complements inline field validation. */
export function alertValidation(
  title = 'Please Check Your Details',
  text = 'Please complete all required fields before submitting.',
) {
  return base.fire({ icon: 'warning', title, text, confirmButtonText: 'OK' })
}

/**
 * Ask the user to confirm an action.
 * Resolves to `true` only when the user presses the confirm button.
 */
export async function confirmAction({
  title = 'Are you sure?',
  text = '',
  confirmButtonText = 'Yes, Continue',
  cancelButtonText = 'Cancel',
} = {}) {
  const result = await base.fire({
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    focusCancel: true,
  })
  return result.isConfirmed
}

/** Blocking loading state for async submissions. Close with `closeAlert()`. */
export function showLoading(title = 'Sending...') {
  return base.fire({
    title,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => Swal.showLoading(),
  })
}

/** Dismiss any open dialog (e.g. the loading state). */
export function closeAlert() {
  Swal.close()
}

export default base
