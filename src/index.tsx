import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainScreen from './main/mainscreen';
import NotFound from './NotFound';
import reportWebVitals from './reportWebVitals';
import CreateTicket from './ticket/createticket';
import CreateQR from './ticket/createqr';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Ticket from './ticket/ticketmain';
import RedirectPage from './redirect/ticketredirectpage';
import PromotionView from './promotion/promotionmain';
import PromotionCreate from './promotion/promotionscreate';
import AuthRedirect from './redirect/authredirectpage';
import Ticketing from './promotion/ticketing';
import "react-loading-skeleton/dist/skeleton.css";
import PromotionEdit from './promotion/promotionedit';
import ProtectedRoute from './routes/protectedroute';
import AccessDeniedPage from './routes/accessdenied';
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter(
  [
    { 
      path: '/', 
      element: <App />,
      errorElement : <NotFound/>,
      children : [
        {
          index : true,
          path : "",
          element : <MainScreen/>
        },
        {
          path:"auth",
          element : <AuthRedirect/>
        },
        {
            path:"accessdenied",
            element: <AccessDeniedPage /> // 접근 제한 페이지
        } ,
        {
          path:"promotion",
          children : [{
            path:":id", 
            element: <PromotionView/>
          },
          
          {
            path : "create",
            element : <ProtectedRoute element={<PromotionCreate/>} /> // 접근 제한
          },{
            path:":id/purchase",
            element : <ProtectedRoute element={<Ticketing/>} /> // 접근 제한
          },{
            path:":id/edit",
            element : <ProtectedRoute element={<PromotionEdit/>} /> // 접근 제한
          }]
        },
        {
          path:"ticket",
          children : [{
            path: "",
            element: <ProtectedRoute element={<Ticket/>} /> // 접근 제한
          
          },{
            path: "createqr",
            element: <ProtectedRoute element={<CreateQR/>} /> // 접근 제한
          
          },
          {
            path:"create",
            element: <ProtectedRoute element={<CreateTicket/>} /> // 접근 제한
          },
          {
            path:"redirect",
            element: <RedirectPage/>
          }
          ]
        }
      ]
    },
  ]

)

root.render(
  
      <RouterProvider router = {router}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
