import dayjs from "dayjs";


export const formatDate = (dateBrut) => {

  let now = dayjs()
  let mydate = dayjs(dateBrut)
  //console.log(newFb)
  let diff = now.diff(mydate,"second");
  let displayDate = ""

  if ((60-diff)  > 0  ) {
    displayDate = `il y a ${diff} second(s)`
  }else if ((3600 - diff) > 0) {
    displayDate = `il y a ${Math.floor(diff/60)} minute(s)`
  } else if ((86400-diff) > 0 ) {
    displayDate = `il y a ${Math.floor(diff/3600)} heure(s)`
  }else if ((2592000 - diff) > 0) {
    displayDate = `il y a ${Math.floor(diff/86400)} jour(s)`
  } else {
    displayDate = dayjs(dateBrut).format("DD/MM/YYYY")
  }

  return displayDate
}
export const formatDateCard = (dateBrut)  => {
  return dayjs(dateBrut).format("DD/MM/YYYY")
}
export const defaultFormat = (dateBrut)  => {
  return dayjs(dateBrut).format("DD/MM/YYYY")
}
export const formatDateProductor = (dateBrut) => {
  let now = dayjs()
  let mydate = dayjs(dateBrut)
  //console.log(newFb)
  let diff = now.diff(mydate,"second");
  let displayDate = ""
  if ((60-diff)  > 0  ) {
    displayDate = `il y a ${diff} second(s)`
  } else {
    displayDate = dayjs(dateBrut).format("DD/MM/YYYY")
  }
  return displayDate

}
