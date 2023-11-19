import { useState } from 'react'

import '@fortawesome/fontawesome-free/css/all.css'
import ShowResults from './ShowResults';


interface FilterDataType {
    [key: string]: string
}

const SearchBar: React.FC = () => {
    const [searchData, setSearchData] = useState<FilterDataType>({});
    const [searchDisplay, setSearchDisplay] = useState<string[]>([]);
    const [filter, setFilter] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("");
    const [start, setStart] = useState<string>("");
    const [end, setEnd] = useState<string>("");
    const [show, setShow] = useState<Boolean>(false);

    const addInputValue = () => {
        if(!filter || !filterValue || filter === "Select filter"){
            alert("Please select a filter.")
        }
        
        const key = filter;
        const value = filterValue;

        setSearchData((prev) => {
            if(prev){
                return {
                    ...prev,
                    [key]: value
                }
            }
            else{
                return {
                    [key]: value
                }
            }
        })
        setSearchDisplay((prev) => {
            if(prev){
                return [
                    ...prev,
                    `  ${filter}: ${filterValue}`
                ]
            }
            else{
                return [`  ${filter}: ${filterValue}`]
            }
        });

        setFilter("");
        setFilterValue("");
    }

    const searchLogs = () => {
        try {
            
            console.log(searchData);

            setSearchDisplay([]);
            // setShow(true);
        } 
        catch (error) {
            alert("Some unexpected error occured.");
            return;
        }        
    }

    const handleTimestampSearch = () => {
        try {
            
            



        } 
        catch (error) {
            alert("Some unexpected error occured.");
            return; 
        }
    }


    return(
        <div className="w-screen h-auto flex flex-col justify-center items-center gap-4">
            <div className="w-screen h-[10vh] flex flex-row justify-center items-center">
                <input value={searchDisplay} readOnly placeholder="Search" type="text" className="font-semibold text-black px-2 text-black w-[80vw] sm:w-[60vw] h-[5vh] border-[2px] border-white rounded-tl-[10px] rounded-bl-[10px] bg-white" />
                <div className="cursor-pointer w-12 h-[5vh] bg-blue-600 hover:bg-blue-700 active:bg-blue-900 flex flex-row justify-center items-center border-[1px] border-white rounded-tr-[10px] rounded-br-[10px]" 
                onClick={searchLogs}
                >
                    <i className="fas fa-search text-white"></i>
                </div>            
            </div>

            <div className="w-screen h-auto flex flex-row justify-center items-center">
                <div className="w-[20vw] sm:w-[10vw] font-semibold text-center pb-[2px] h-[4vh] border-[2px] border-white rounded-[10px] bg-white">
                    Timestamp Filter
                </div>

                <input value={start} onChange={(e) => setStart(e.target.value)} type="text" placeholder="Start" className="w-[20vw] sm:w-[10vw] pb-[2px] text-black h-[4vh] border-l-[2px] border-gray-800 rounded-bl-[10px] rounded-tl-[10px] bg-white pl-2" />   

                <input value={end} onChange={(e) => setEnd(e.target.value)} type="text" placeholder="End" className="w-[20vw] sm:w-[10vw] pb-[2px] text-black h-[4vh] border-l-[2px] border-gray-800 rounded-br-[10px] rounded-tr-[10px] bg-white pl-2" />    

                <div className="flex flex-row justify-center items-center cursor-pointer ml-20 border-[0.5px] border-white rounded-[10px] px-[27px] h-[4vh] bg-blue-600 hover:bg-blue-700 active:bg-blue-900 font-semibold" onClick={handleTimestampSearch}>
                    Search
                </div>            

            </div>

            <div className="w-screen h-auto flex flex-row justify-center items-center">

                <select className="w-[30vw] sm:w-[15vw] pl-2 pb-[2px] h-[4vh] border-[2px] border-white rounded-bl-[10px] rounded-tl-[10px] bg-white" onChange={(e) => setFilter(e.target.value)} value={filter}>
                    <option>Select filter</option>
                    <option>level</option>
                    <option>message</option>
                    <option>resourceId</option>
                    <option>traceId</option>
                    <option>spanId</option>
                    <option>commit</option>
                    <option>metadata.parentResourceId</option>
                </select>
                <input value={filterValue} onChange={(e) => setFilterValue(e.target.value)} type="text" placeholder="Filter value" className="w-[30vw] sm:w-[15vw] pb-[2px] text-black h-[4vh] border-l-[2px] border-gray-800 rounded-br-[10px] rounded-tr-[10px] bg-white pl-2" />


                <div className="flex flex-row justify-center items-center cursor-pointer ml-20 border-[0.5px] border-white rounded-[10px] px-4 h-[4vh] bg-blue-600 hover:bg-blue-700 active:bg-blue-900 font-semibold" onClick={addInputValue}>
                    Add Filter
                </div>
            </div>
            
            <div className={`${show ? "block" : "hidden"} w-screen h-auto flex flex-col justify-center items-center mt-[10vh]`}>
                <ShowResults />
            </div>


        </div>
    )
}

export default SearchBar