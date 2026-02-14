import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet } from 'react-router'
import type { AppDispatch, RootState } from './store'
import { initializeAuth } from './slice/authAction'

export default function ProtectedRoute() {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useSelector((state: RootState) => state.auth)
    // Try to see if we have valid auth key
    if (!user) {
        console.log("Authenticating")
        dispatch(initializeAuth());
    }
    //if still no user then 
    if (!user) {
        return (
            <div className='unauthorized'>
                <h1>Unauthorized :( </h1>
                <span>
                    <NavLink to='/'>Login</NavLink> to gain access
                </span>
            </div>
        )
    }

    return <Outlet />
}
