import React from 'react'
import { Panel, Divider, FlexboxGrid, ButtonToolbar, Button, Icon } from 'rsuite'
import './../styles/answer.css'
import CommentSection from './commentSection'

function Answer() {
    return (
        <div className="">
            <Panel className="post-card">
                <div>
                    <p className="user-name">Husain Johnson</p>
                    <p className="answer-time">Answered a year ago</p>
                </div>
                <Divider />
                <div>
                    Zubat Leaf Green. Pokemon 4Ever Leech Life Delibird Ambipom fishing rod Swalot Grimer. Velit esse cillum dolore eu fugiat nulla pariatur Lucario Yellow Stantler Dugtrio Drifblim Teleport.
                    Zubat Leaf Green. Pokemon 4Ever Leech Life Delibird Ambipom fishing rod Swalot Grimer. Velit esse cillum dolore eu fugiat nulla pariatur Lucario Yellow Stantler Dugtrio Drifblim Teleport.
                </div>
                <Divider />

                <FlexboxGrid justify="space-between">
                    <FlexboxGrid.Item>
                        <ButtonToolbar>
                            <Button><Icon icon='thumbs-o-up' /></Button>
                            <Button>4 Votes</Button>
                            <Button><Icon icon='thumbs-o-down' /></Button>
                            <span style={{ margin: "0 1em" }}></span>
                        </ButtonToolbar>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
            <Panel className="comments-body" >
                <CommentSection />
            </Panel>

        </div>
    )
}

export default Answer