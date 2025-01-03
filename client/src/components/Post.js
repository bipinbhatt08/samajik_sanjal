import { Avatar, Tooltip } from '@nextui-org/react'
import { Emoji } from 'emoji-picker-react';
import React, { useState } from 'react'
import { FaThumbsUp } from "react-icons/fa";

const TestPost = ( {avatarLink}) => {
console.log("LINK",avatarLink)
  const reactions = { 
    like: {
      unified: '1f44d',
      color: 'text-blue-600',
      label: 'Like'
    },
    love: {
      unified: '2764-fe0f',
      color: 'text-red-600',
      label: 'Love'
    },
    haha: {
      unified: '1f602',
      color: 'text-yellow-500',
      label: 'Haha'
    },
    wow: {
      unified: '1f62e',
      color: 'text-yellow-500',
      label: 'Wow'
    },
    sad: {
      unified: '1f622',
      color: 'text-yellow-500',
      label: 'Sad'
    },
    angry: {
      unified: '1f621',
      color: 'text-orange-600',
      label: 'Angry'
    }
  }
  const reactionForToolTip = Object.values(reactions).map((reaction)=>reaction.unified)
  const [reaction,setReaction]=useState(reactions.like)

  const [isReacted,setIsReacted]=useState(false)

  
  const handleReaction=(emojiCode,event)=>{
    const selectedReaction= Object.entries(reactions).find((current, index)=>current[1].unified == emojiCode)
    setReaction(selectedReaction[1])
    setIsReacted(true)

  }


const handleLikeButtonClick =()=>{
   if(isReacted===false){
    setIsReacted(true)
    setReaction(reactions.like)
   }


}
  return (
    <>
      <div className="post border border-gray-300 mb-5 rounded-md pt-4 pr-4 pl-4 bg-white ">
              <div className="postHeader flex justify-start items-center gap-3 mb-3">
                <div className="avatarAndName">
                  <div className="avatar">
                    <Avatar size="lg" src={`${process.env.NEXT_PUBLIC_API_URI}/uploads/${avatarLink}`} />
                  </div>
                </div>
                <div className="name">
                    <div className=" text-lg font-bold">
                      Bipin Bhatt
                    </div>
                      <p> 3 yrs ago</p>
                  </div>
              </div>
            {/* post Content goes here */}
              <div className="postStatus">
                <p>Sunsan xa goth paana kasya nai khau mui</p>
              </div>
              <div className="images">
                images here
              </div>
            {/* POST FOOTER GOES HERE */}
              <div className="postFooter mt-3">
              <div className="CountsContainer flex justify-between items-center py-1">
                <div className="reactionCount">
                   👍❤️😂  242 Reactions
                  </div>
                  <div className="commentCount">
                    🗨️ 27 Comments
                  </div> 
              </div>

              {/* reaction button  */}
              <div className="reactionAndCommentBtns flex justify-between items-center py-1 border-t border-gray-300 ">
                
                <Tooltip
                    delay={1000}
                    // isOpen={isTootipOpen} onOpenChange={(open) => setisTootipOpen(open)}
                    content={ 
                        <div className='emojis flex justify-center items-center gap-2'>
                            {reactionForToolTip.map((em)=>{
                            return <button onClick={(e)=>handleReaction(em,e)} id={em} key={em}><Emoji unified={em} size={25} emojiStyle='facebook'/> </button>
                            })}
                                
                        </div>
                    }>


                  <button onClick={handleLikeButtonClick} className={`${ isReacted?reaction.color:''} font-bold  border px-5 py-1 rounded-sm border-hidden text-gray-400 flex justify-center items-center gap-2  hover:bg-gray-100`}>
                    {
                    isReacted ? <><Emoji unified={reaction.unified} size={25} emojiStyle='facebook'></Emoji> {reaction.label}</>
                    : 
                    <><FaThumbsUp /> <span>Like</span></>
                    }
                  </button>




                </Tooltip>




                {/* comment section */}
                <div className="comment">
                 🗨️ Comment
                </div>
                
              </div>

              <div className="commentSection">

                comment section
              </div>
              </div>
      </div>
    </>
  )
}

export default TestPost
