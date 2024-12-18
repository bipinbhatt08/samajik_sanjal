import { Avatar, Button } from '@nextui-org/react'
import React from 'react'

const Post = () => {
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
                      BIpin Bhatt
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
              <div className="reactionAndCommentBtns flex justify-between items-center py-2 border-t border-gray-300 ">
                <Button radius='sm' color='primary' size='sm'>Like</Button>
                <Button radius='sm' color='secondary' size='sm'  >Comment</Button>
              </div>
            </div>
            </div>
    </>
  )
}

export default Post
