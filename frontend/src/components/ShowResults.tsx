interface ReceivedPropTypes {
    level: String,
    message: String,
    timestamp: Date,
    resourceId: String,
    traceId: String,
    spanId: String,
    commit: String,
    metadata: {
        parentResourceId: String,
    }
}

interface ShowResultsProps {
    result: ReceivedPropTypes[]
}



const ShowResults: React.FC<ShowResultsProps> = ({ result }) => {
    const list = result.map((data, index) => {
        return (<div key={index} className="border-b-[1px] border-white rounded-[0px] w-full px-4 py-8">
            
            <p>{"{"}</p>
            <span className="ml-8"><span className="text-red-400 font-semibold">level:</span> {data.level},</span><br />
            <span className="ml-8"><span className="text-red-400 font-semibold">message:</span> {data.message},</span><br />
            <span className="ml-8"><span className="text-red-400 font-semibold">timestamp:</span> {data.timestamp.toString()},</span><br />
            <span className="ml-8"><span className="text-red-400 font-semibold">resourceId:</span> {data.resourceId},</span><br />
            <span className="ml-8"><span className="text-red-400 font-semibold">traceId:</span> {data.traceId},</span><br />
            <span className="ml-8"><span className="text-red-400 font-semibold">spanId:</span> {data.spanId},</span><br />
            <span className="ml-8"><span className="text-red-400 font-semibold">commit:</span> {data.commit},</span><br />
            <span className="ml-8"><span className="text-red-400 font-semibold">metadata:</span> {"{"}</span><br />
            <span className="ml-16">    <span className="text-red-400 font-semibold">parentResourceId:</span> {data.metadata.parentResourceId}</span><br />
            <span className="ml-8">{"}"}</span>
            <p>{"}"}</p>
            
        </div>)
    })


    return(
        <div className="text-white w-screen sm:w-[60vw] h-auto min-h-[60vh] flex flex-col justify-start items-center py-8 px-20 border-[1px] border-white rounded-[10px]" >

            {list}
            
        </div>
    )
}

export default ShowResults