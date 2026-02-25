const UserDropDown = () => {
    return (
        <div className="dropdown dropdown-end">
            <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
            >
                <div className="w-10 rounded-full">
                    <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="avatar"
                    />
                </div>
            </div>
            <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content bg-base-100 rounded-box z-1 w-52 shadow"
            >
                <li>
                    <a className="justify-between">
                        Perfil
                        <span className="badge">Nuevo</span>
                    </a>
                </li>
                <li>
                    <a>Configuración</a>
                </li>
                <li>
                    <a>Cerrar Sesión</a>
                </li>
            </ul>
        </div>
    )
}

export default UserDropDown
