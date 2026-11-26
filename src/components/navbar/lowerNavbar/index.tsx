import { HeartIcon, HouseIcon, UserIcon } from "@phosphor-icons/react";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import { NavLink } from "react-router-dom";
import type { CartProps } from "../../../features/cart/CartContext";

export function MobileNavbar({
  cart,
  signed,
  loadingAdmin,
}: {
  cart: CartProps[];
  signed: boolean;
  loadingAdmin: boolean;
}) {
  return (
    <nav className="w-full flex bg-fondo justify-between  items-center">
      <NavLink
        to="/"
        end
        className={({ isActive }) =>
          `flex items-center px-4 rounded-xl gap-2 hover:cursor-pointer h-12 ${
            isActive ? "bg-active text-white" : "bg-fondo text-gray"
          }`
        }
      >
        {({ isActive }) => (
          <div className="rounded-full">
            <HouseIcon size={32} weight={isActive ? "fill" : "regular"} />
          </div>
        )}
      </NavLink>

      <NavLink
        to="/favoritos"
        className={({ isActive }) =>
          `flex items-center px-2 rounded-xl gap-2 hover:cursor-pointer h-12 ${
            isActive ? "bg-active text-white" : "bg-fondo text-gray"
          }`
        }
      >
        {({ isActive }) => (
          <div className="rounded-full p-1">
            <HeartIcon size={32} weight={isActive ? "fill" : "regular"} />
          </div>
        )}
      </NavLink>

      <NavLink
        to="/cart"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 rounded-xl gap-2 hover:cursor-pointer ${
            isActive ? "bg-active text-white" : "bg-fondo text-gray"
          }`
        }
      >
        <div className="relative bg-fondo rounded-full p-1">
          <LiaCartArrowDownSolid size={36} strokeWidth={0} />
          {cart.length > 0 && (
            <span className="absolute -right-2 -top-2 px-2.5 bg-rose-500 w-6 h-6 rounded-full flex justify-center items-center text-white">
              {cart.length}
            </span>
          )}
        </div>
      </NavLink>

      <NavLink
        to="/login"
        className={({ isActive }) =>
          `flex items-center px-4 py-2 rounded-xl gap-2 hover:cursor-pointer ${
            isActive ? "bg-active text-white" : "bg-fondo text-gray"
          }`
        }
      >
        <div className="flex items-center justify-center transition-all">
          {!loadingAdmin && !signed && (
            <div className="flex gap-4 items-center">
              <div className="flex items-baseline justify-center">
                <UserIcon
                  size={30}
                  className="text-gray hover:text-white transition-all"
                />
              </div>
            </div>
          )}

          {!loadingAdmin && signed && (
            <strong className="text-white text-sm">Admin</strong>
          )}
        </div>
      </NavLink>
    </nav>
  );
}