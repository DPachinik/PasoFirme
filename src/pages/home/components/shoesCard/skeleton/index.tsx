
export function Skeleton(){
    return(
        Array.from({length:8}).map((_,index)=>(
            <article key={index} className="rounded-[13px] bg-[#F8F7F7] px-2.5 pb-[9px]">
                <div className="w-full h-[95px] bg-secondary rounded-lg"></div>
                <div className="w-3/4 h-5 bg-secondary rounded mt-4"></div>    
                <div className="w-1/2 h-6 bg-secondary rounded mt-4"></div>
            </article>
        ))        
    )
}