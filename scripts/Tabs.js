import BaseComponent from "./BaseComponent.js";



const rootSelector = '[data-js-tabs]'

class Tabs extends BaseComponent{
    selectors = {
        root: rootSelector,
        button: '[data-js-tabs-button]',
        content: '[data-js-tabs-content]',

    }

    stateClasses = {
        isActive: 'is-active',
    }

    stateAttributes = {
        ariaSelected: 'aria-selected',
        tabIndex: 'tabindex',
    }

    constructor(rootElement) {
        super()
        this.rootElement = rootElement
        this.buttonElement = this.rootElement.querySelectorAll(this.selectors.button)
        this.contentElement = this.rootElement.querySelectorAll(this.selectors.content)
        this.state = {
            activeTabIndex: [...this.buttonElement]
                .findIndex((buttonElement) => buttonElement.classList.contains(this.stateClasses.isActive))
        }
        this.limitTabsIndex = this.buttonElement.length - 1
        this.bindEvents()

    }

    updateUI() {
        const {activeTabIndex} = this.state

        this.buttonElement.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex

            buttonElement.classList.toggle(this.stateClasses.isActive, isActive)
            buttonElement.setAttribute(this.stateAttributes.ariaSelected, isActive.toString())
            buttonElement.setAttribute(this.stateAttributes.tabIndex, isActive ? '0' : '-1')
        })

        this.contentElement.forEach((buttonElement, index) => {
            const isActive = index === activeTabIndex

            contentElement.classList.toggle(this.stateClasses.isActive, isActive)
        })

    }

    activateTab(newTabIndex) {
        this.state.activeTabIndex = newTabIndex
        this.buttonElement[newTabIndex].focus()
    }

    previousTab = () => {
        const newTabIndex = this.state.activeTabIndex === 0
            ? this.limitTabsIndex
            : this.state.activeTabIndex - 1

        this.activateTab(newTabIndex)
    }
    nextTab = () => {
        const newTabIndex = this.state.activeTabIndex === this.limitTabsIndex
            ? 0
            : this.state.activeTabIndex + 1

        this.activateTab(newTabIndex)
    }
    firstTab = () => {
        this.activateTab(0)
    }
    lastTab = () => {
        this.activateTab(this.limitTabsIndex)
    }

    onButtonClick(buttonIndex) {
        this.state.activeTabIndex = buttonIndex
        this.updateUI()
    }

    onKeyDown = (event) => {
        const {code, metaKey} = event

        const action = {
            ArrowLeft: this.previousTab,
            ArrowRight: this.nextTab,
            Home: this.firstTab,
            End: this.lastTab,
        }[code]

        const isMacHomeKey = metaKey && code === 'ArrowLeft'
        if (isMacHomeKey) {
            this.firstTab()
            this.updateUI()
            return
        }

        const isMacEndKey = metaKey && code === 'ArrowRight'
        if (isMacEndKey) {
            this.lastTab()
            this.updateUI()
            return
        }

        if (action) {
            action()
            this.updateUI()

        }
    }

    bindEvents() {
        this.buttonElement.forEach((buttonElement, index) => {
            buttonElement.addEventListener('click', () => this.onButtonClick(index))
        })
        this.rootElement.addEventListener('keydown', this.onKeyDown)
    }

}

class TabsCollections {
    constructor() {
        this.init()
    }

    init() {
        document.querySelectorAll(rootSelector).forEach((element) => {
            new Tabs(element)
        })
    }
}

export default TabsCollections

