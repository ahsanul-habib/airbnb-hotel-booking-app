import Link from 'next/link';

export default function Pagination({ page, totalHotels }) {
  const pageSize = 8;
  const totalPages = Math.ceil(totalHotels / pageSize); 

  const generatePageLink = (pageNumber) => `/?page=${pageNumber}`;

  return (
    <nav aria-label="Page navigation" className="mt-8 flex justify-center">
      <ul className="inline-flex items-center -space-x-px">
        {/* Previous Button */}
        <li>
          {page > 1 ? (
            <Link
              href={generatePageLink(page - 1)}
              className="block py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white rounded-l-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <span className="sr-only">Previous</span>
              &laquo;
            </Link>
          ) : (
            <span
              className="block py-2 px-3 ml-0 leading-tight text-zinc-500 bg-white rounded-l-lg border border-zinc-300 cursor-not-allowed opacity-50"
            >
              <span className="sr-only">Previous</span>
              &laquo;
            </span>
          )}
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
          <li key={pageNumber}>
            <Link
              href={generatePageLink(pageNumber)}
              className={`py-2 px-3 leading-tight border border-zinc-300 ${
                pageNumber === page
                  ? 'text-white bg-zinc-500 font-semibold'
                  : 'text-zinc-500 bg-white hover:bg-zinc-100 hover:text-zinc-700'
              }`}
              aria-current={pageNumber === page ? 'page' : undefined}
            >
              {pageNumber}
            </Link>
          </li>
        ))}

        {/* Next Button */}
        <li>
          {page < totalPages ? (
            <Link
              href={generatePageLink(page + 1)}
              className="block py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 hover:bg-zinc-100 hover:text-zinc-700"
            >
              <span className="sr-only">Next</span>
              &raquo;
            </Link>
          ) : (
            <span
              className="block py-2 px-3 leading-tight text-zinc-500 bg-white rounded-r-lg border border-zinc-300 cursor-not-allowed opacity-50"
            >
              <span className="sr-only">Next</span>
              &raquo;
            </span>
          )}
        </li>
      </ul>
    </nav>
  );
}
