import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
    // we can add header footer here
    return (
        <div className="app-container">
            <div className="app-main">
                {children}
            </div>
        </div>
    )
}

export default Layout