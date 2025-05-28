import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";
import SearchPage from "../pages/SearchPage";
import ContactUs from "../pages/ContactUs"; 
import Feedback from "../pages/Feedback";
import TermsPrivacy from "../pages/TermsPrivacy"; 
const router = createBrowserRouter([
    {
        path : "/",
        element : <App/>,
        children : [
            {
                path : "",
                element : <Home/>
            },
            {
                path : ":explore",
                element : <ExplorePage/>
            },
            {
                path : ":explore/:id",
                element : <DetailsPage/>
            },
            {
                path : "search",
                element : <SearchPage/>
            },
       
        ]
    },
          {
        path: "contact",
        element: <ContactUs />,
      },
      {
  path: "feedback", 
  element: <Feedback />,
},
{
    path: "TermsPrivacy",
    element:<TermsPrivacy />,
}
])

export default router