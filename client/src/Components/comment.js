import React from 'react'
import { List, FlexboxGrid } from 'rsuite'

import './../styles/comments.css'

function Comment() {
    return (
        <List.Item className="comment">
            <FlexboxGrid justify="space-between" className="full-width">
                <FlexboxGrid.Item>
                    Qui officia deserunt mollit Palpitoad Lugia Tympole Ivysaur Stunky Abomasnow. Water Joltik
                </FlexboxGrid.Item>
                <FlexboxGrid.Item>
                    asked 13 mins ago <a href="https://www.google.com">Greil Omatics</a>

                </FlexboxGrid.Item>
            </FlexboxGrid>
        </List.Item>
    )
}
export default Comment;