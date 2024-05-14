import { Wishlist } from "@/db/models/wishlist";
import DeleteButton from "./DeleteButton";

export default function TableRow({
  row,
  getWishlist,
}: {
  row: Wishlist;
  getWishlist: () => Promise<void>;
}) {
  return (
    <tr>
      <td>
        <div className='flex items-center gap-3'>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12'>
              <img src={row.Product?.thumbnail} alt='Product thumbnail' />
            </div>
          </div>
          <div>
            <a href={`/products/${row.Product?.slug}`}>
              <div className='font-bold hover:text-blue-500'>
                {row.Product?.name}
              </div>
              <div className='text-sm opacity-50'>{row.Product?.excerpt}</div>
            </a>
          </div>
        </div>
      </td>
      <td>
        <span className='badge badge-ghost badge-sm'>
          {row.Product?.description}
        </span>
      </td>
      <td>{row.Product?.price}</td>
      <th>
        <DeleteButton id={row._id} getWishlist={getWishlist} />
      </th>
    </tr>
  );
}
