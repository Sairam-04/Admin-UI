import { getAdmin } from "./utils/localstorage"
const {token, role} = getAdmin()
const Authorization = token ? token : ""
export default Authorization