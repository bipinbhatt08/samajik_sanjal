import { Avatar, Button, Tooltip } from '@nextui-org/react'
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import React, { useCallback, useState } from 'react'
import { FaThumbsUp } from "react-icons/fa";

const Post = () => {

  const reactions = { 
    like: {
      unified: '1f44d',
      color: 'text-blue-600',
      label: 'Like'
    },
    care: {
      unified: '1f917',
      color: 'text-orange-400',
      label: 'Care'
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
  const [isTootipOpen, setisTootipOpen]= useState(false)

  
  const handleReaction=(e)=>{
    const selectedReaction= Object.entries(reactions).find((current, index)=>current[1].unified == e.unified)
    setReaction(selectedReaction[1])
    setIsReacted(true)
    setisTootipOpen(false)
  }



  return (
    <>
      <div className="post border border-gray-300 mb-5 rounded-md pt-4 pr-4 pl-4 bg-white ">
              <div className="postHeader flex justify-start items-center gap-3 mb-3">
                <div className="avatarAndName">
                  <div className="avatar">
                    <Avatar size="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
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
                isOpen={isTootipOpen} onOpenChange={(open) => setisTootipOpen(open)}
                content={ 
                   <EmojiPicker 
                   onReactionClick={handleReaction}
                   className='border-none' emojiStyle='facebook' allowExpandReactions={false} reactionsDefaultOpen={true} reactions={reactionForToolTip} />
                   }>
                  <button 
                  className={
                    `${ isReacted?reaction.color:''}
                    font-bold
                    border px-5 py-1 rounded-sm border-hidden text-gray-400 flex justify-center items-center gap-2  hover:bg-gray-100`
                    }>
                    
                    {
                    isReacted ? 
                    <>
                        <Emoji unified={reaction.unified} size={25} emojiStyle='facebook'></Emoji> {reaction.label}
                    </>
                    : 
                    <>
                        <FaThumbsUp /> <span>Like</span>
                    </>
    } 
                  </button>
                </Tooltip>
                <div className="comment">
                 🗨️ Comment
                </div>
              </div>
            </div>
            </div>
    </>
  )
}

export default Post
