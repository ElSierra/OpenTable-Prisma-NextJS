import { Item } from "@prisma/client";
import MenuCard from "./MenuCard";


export default function Menu({menuItems}: {menuItems: Item[]}) {
  console.log("🚀 ~ file: Menu.tsx:6 ~ Menu ~ menuItems", menuItems)
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menuItems.length ? (
        <div className="flex flex-wrap justify-between">

       {menuItems.map((menu)=>{return(<MenuCard {...menu} key={menu.id}/>)})}
        </div>): (
 <div className="flex flex-wrap justify-between">
  <p>This restauarant contains No Menus</p>
  </div>
        )}
      </div>
    </main>
  );
}
