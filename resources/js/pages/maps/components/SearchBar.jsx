import React from "react";

const SearchBar = ({ searchTerm, onSearch, results, onPick, inputRef, onFocus, isOpen, storageBaseUrl }) => {
    return (
        <div className="lg:w-[60%] right-[3%]  bg-white rounded">
            <input
                ref={inputRef}
                onFocus={onFocus}
                className="p-2 rounded w-full"
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />
            {isOpen && (
                <div className="bg-white duration-700 max-h-[50vh] overflow-y-auto">
                    {results.map((element, index) => (
                        <div
                            key={index}
                            onClick={() => onPick(element)}
                            className=" h-14 flex flex-row items-start gap-2 p-2 border-b-2 hover:bg-alpha/20 cursor-pointer"
                        >
                            <div className="w-10 aspect-square object-cover bg-gray-100 rounded-full ">
                                <img
                                    src={storageBaseUrl + `/storage/${element?.showable?.logo || element?.showable?.logo_path}`}
                                    className="w-full h-full object-cover rounded-full"
                                    alt="logo"
                                />
                            </div>
                            <div>
                                <p className="font-bold">
                                    {element?.showable_type === "App\\Models\\Organization"
                                        ? element?.showable?.name
                                        : element?.showable_type === "App\\Models\\Publique"
                                            ? element?.showable?.institution_name
                                            : element?.showable?.nom}{" "}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;



