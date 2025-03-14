import { mounted, mut, render, html, sig, mem, eff_on } from "./lib/solid/monke.js"
import {
  model,
  markdown,
  view,
  state,
  schema,
  schemaList,
  exampleSetup,
  commands,
  keymap,
  autocomplete,
} from "./lib/prosemirror/dist/main.js"


import {
  floating
} from "./lib/floating-ui/dist/main.js"

let compute_position = floating.computePosition
let M = mut({})
document.M = M

let pencil = `
<svg viewBox="0 -0.5 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" width="15" height="15">
<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
<g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M17.265 4.16231L19.21 5.74531C19.3978 5.9283 19.5031 6.17982 19.5015 6.44201C19.5 6.70421 19.3919 6.9545 19.202 7.13531L17.724 8.93531L12.694 15.0723C12.6069 15.1749 12.4897 15.2473 12.359 15.2793L9.75102 15.8793C9.40496 15.8936 9.10654 15.6384 9.06702 15.2943L9.18902 12.7213C9.19806 12.5899 9.25006 12.4652 9.33702 12.3663L14.15 6.50131L15.845 4.43331C16.1743 3.98505 16.7938 3.86684 17.265 4.16231Z" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M5.5 18.2413C5.08579 18.2413 4.75 18.5771 4.75 18.9913C4.75 19.4056 5.08579 19.7413 5.5 19.7413V18.2413ZM19.2 19.7413C19.6142 19.7413 19.95 19.4056 19.95 18.9913C19.95 18.5771 19.6142 18.2413 19.2 18.2413V19.7413ZM14.8455 6.22062C14.6904 5.83652 14.2534 5.65082 13.8693 5.80586C13.4852 5.9609 13.2995 6.39796 13.4545 6.78206L14.8455 6.22062ZM17.8893 9.66991C18.2933 9.57863 18.5468 9.17711 18.4556 8.77308C18.3643 8.36904 17.9628 8.1155 17.5587 8.20678L17.8893 9.66991ZM5.5 19.7413H19.2V18.2413H5.5V19.7413ZM13.4545 6.78206C13.6872 7.35843 14.165 8.18012 14.8765 8.8128C15.6011 9.45718 16.633 9.95371 17.8893 9.66991L17.5587 8.20678C16.916 8.35198 16.3609 8.12551 15.8733 7.69189C15.3725 7.24656 15.0128 6.63526 14.8455 6.22062L13.4545 6.78206Z" fill="#000000"></path> </g></svg>
`
let default_image = ""



































let style = sig(`
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap');
@import url("https://use.typekit.net/vfz2iav.css");

*::-webkit-scrollbar {
  display: none;
}

*{
  font-family: "JetBrains Mono", monospace;
  font-family: "platelet", sans-serif;
  padding: 0;
  margin: 0;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}


body {
  background: var(--base07);
  color: var(--base01);
  overflow: hidden;
}

input[type="text"], button{
  all: unset;
  background: white;
  border: 1px solid black;
  padding:.3em;
  margin: .5em;
}

button {
  cursor: pointer;
}

.block-link {
  cursor : pointer;
  color : blue;
  height : 2em;
  background-size : 2em;
  padding-left : 2.5em;
  background-repeat : no-repeat;
}

.top-bar {
  height: 100%;
  padding: 1em;
  display: flex;
  justify-content: space-between;
}

.main {
  display: grid;
  width: 100vw;
  max-width: 1400px;
  margin: 0 auto;
  grid-template-rows: 8% 85%;
  padding: 1em;
  grid-gap: 1em;
  overflow: hidden;
  height: 100vh;
}

.dual {
  display: grid;
  width: 100vw;
  max-width: 1400px;
  height: 100%;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr;
  padding: 1em;
  grid-gap: 1em;
  overflow: hidden;
}

.smol{
  display: block-inline;
  width: 15px;
  height: : 15px;
}

.selected-result {
  background-color: #6666;
}

.line {
  display: grid;
  grid-template-columns: 1fr 8fr;
}

.bottom-right{
  position: absolute;
  left: 1em;
  bottom: .5em;
  opacity: .2;
}

.ingredient-results p{
  text-overflow: ellipsis;
  overflow: hidden;
}

.selected {
  background-color: #4444;
}

.main > div {
  border: 1.5px dotted #ddd;
  box-shadow: 0 0 15px 5px #6661;
}

.editor-container{
  overflow-y: scroll;
  height: 100%;
}

.arena-container { 
  padding: 1em;
  height: 100%;
  overflow-y: scroll; 
}

.auth {
  position: absolute;
  right: 1em;
  font-size: .8em; 
  color: green;
  padding: .25em;
  border-radius: 5px;
  border: .5px green solid;
  margin: 1em;
}

.dishes-container, .ingredients-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 10rem);
}

#ingredient-search {
  border: 1px red dotted;
}

.ingredient.active{
  background-color: #F3EAEC; 
}

.arena-container h2 {
  padding: .5em;
  margin: .5em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: .03em;
  border-bottom: 1px dotted grey;
  border-radius: .25em;
  width: 400px;
  
}

.login .text {
  padding: .5em;
  margin: .5em;
  font-weight: 300;
  background: #5551;
  letter-spacing: .03em;
  border-radius: .25em;
  width: 400px;
  
}

.block {
  width: 7rem;
  border: 1px solid #0002;
  margin: .5em;
  padding: 1em;
  position: relative;
  aspect-ratio: 1/1;
}

.block:hover {
  background-color: #0002;
}

.ProseMirror {
  position: relative;
  padding: 5em;
}

.ProseMirror li {
  margin-left: 2.5em;
}

.ProseMirror h1,
.ProseMirror h2,
.ProseMirror h3,
.ProseMirror h4
{
  margin-top: .7em;
  margin-bottom: .2em;
}

.ProseMirror {
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
}

.ProseMirror pre { white-space: pre-wrap; }

.ProseMirror li { position: relative; }

.ProseMirror-hideselection *::selection { background: transparent; }
.ProseMirror-hideselection *::-moz-selection { background: transparent; }
.ProseMirror-hideselection { caret-color: transparent; }

/* See https://github.com/ProseMirror/prosemirror/issues/1421#issuecomment-1759320191 */
.ProseMirror [draggable][contenteditable=false] { user-select: text }

.ProseMirror-selectednode {
  background-color: #9991; 
}

/* Make sure li selections wrap around markers */

li.ProseMirror-selectednode {
  outline: none;
}

li.ProseMirror-selectednode:after {
  content: "";
  position: absolute;
  left: -32px;
  right: -2px; top: -2px; bottom: -2px;
  border: 2px solid pink;
  pointer-events: none;
}

/* Protect against generic img rules */

img.ProseMirror-separator {
  display: inline !important;
  border: none !important;
  margin: 0 !important;
}


   /* ----- */
  /* MENU  */
 /* ----- */

.ProseMirror-textblock-dropdown {
  min-width: 3em;
}

.ProseMirror-menu {
  margin: 0 -4px;
  line-height: 1;
}

.ProseMirror-tooltip .ProseMirror-menu {
  width: -webkit-fit-content;
  width: fit-content;
  white-space: pre;
}

.ProseMirror-menuitem {
  margin-right: 3px;
  display: inline-block;
}

.ProseMirror-menuseparator {
  border-right: 1px solid #ddd;
  margin-right: 3px;
}

.ProseMirror-menu-dropdown, .ProseMirror-menu-dropdown-menu {
  font-size: 90%;
  white-space: nowrap;
}

.ProseMirror-focused {
  outline: none !important;
  border: none;
}

.ProseMirror-menu-dropdown {
  vertical-align: 1px;
  cursor: pointer;
  position: relative;
  padding-right: 15px;
}

.ProseMirror-menu-dropdown-wrap {
  padding: 1px 0 1px 4px;
  display: inline-block;
  position: relative;
}

.ProseMirror-menu-dropdown:after {
  content: "";
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid currentColor;
  opacity: .6;
  position: absolute;
  right: 4px;
  top: calc(50% - 2px);
}

.ProseMirror-menu-dropdown-menu, .ProseMirror-menu-submenu {
  position: absolute;
  background: white;
  color: #666;
  border: 1px solid #aaa;
  padding: 2px;
}

.ProseMirror-menu-dropdown-menu {
  z-index: 15;
  min-width: 6em;
}

.ProseMirror-menu-dropdown-item {
  cursor: pointer;
  padding: 2px 8px 2px 4px;
}

.ProseMirror-menu-dropdown-item:hover {
  background: #f2f2f2;
}

.ProseMirror-menu-submenu-wrap {
  position: relative;
  margin-right: -4px;
}

.ProseMirror-menu-submenu-label:after {
  content: "";
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 4px solid currentColor;
  opacity: .6;
  position: absolute;
  right: 4px;
  top: calc(50% - 4px);
}

.ProseMirror-menu-submenu {
  display: none;
  min-width: 4em;
  left: 100%;
  top: -3px;
}

.ProseMirror-menu-active {
  background: #eee;
  border-radius: 4px;
}

.ProseMirror-menu-disabled {
  opacity: .3;
}

.ProseMirror-menu-submenu-wrap:hover .ProseMirror-menu-submenu, .ProseMirror-menu-submenu-wrap-active .ProseMirror-menu-submenu {
  display: block;
}

.ProseMirror-menubar-wrapper {
  height: 100%;
}
.ProseMirror-menubar {
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;
  position: relative;
  min-height: 1em;
  color: #666;
  padding: 1px 6px;
  top: 0; left: 0; right: 0;
  border-bottom: 1px solid silver;
  background: white;
  z-index: 10;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow: visible;
}

.ProseMirror-icon {
  display: inline-block;
  line-height: .8;
  vertical-align: -2px; /* Compensate for padding */
  padding: 2px 8px;
  cursor: pointer;
}

.ProseMirror-menu-disabled.ProseMirror-icon {
  cursor: default;
}

.ProseMirror-icon svg {
  fill: currentColor;
  height: 1em;
}

.ProseMirror-icon span {
  vertical-align: text-top;
}




`)

let cached_style = localStorage.getItem("recipe-style")
if (cached_style) style.set(cached_style)

M.style = style













const first_line = (str) => str ? str.split(`\n`).shift() : "undefined"
const refresh = (slug) => client.channel(slug).hack_refresh()


const selected_dish_has_me = (block) => {
  if (selected_block()?.title == "dish") {
    console.log(block.content, connections()[block.id])
    if (connections()[block.id].find((b) => b.id == selected_block()?.id)) return true
  }
  else false
}

const add_dish = () => {
  let b
  create_dish_block()
    .then((block) => {
      b = block
      refresh(MAIN_CHANNEL)
    })
    .then((res) => {
      if (!b) return
      selected_block.set(b)
    })
    .then(() => update_channel(MAIN_CHANNEL))
}

/**
* @returns {(Promise<import("./lib/arena.js").Block | Undefined>)}
*/
const add_ingredient = async (str) => {
  let b
  await create_ingredient_block(str)
    .then((block) => {
      b = block
      return refresh(MAIN_CHANNEL)
    })
    .then(() => update_channel(MAIN_CHANNEL))

  return b
}

const update_channel = (slug) => client
  .channel(slug)
  .get()
  .then((c) => {
    console.log("update", c)
    channels.set([c])
  })

const save_block = (content, block) => {
  if (block && MAIN_CHANNEL) {
    client.block(block.id).update({ content })
      .then(_ => refresh(MAIN_CHANNEL))
      .then(_ => update_channel(MAIN_CHANNEL))
      .then(_ => {
        // if selected_block = block.id
        if (selected_block()?.id == block.id) {
          let updated = contents()
          let this_block = updated.find((b) => b.id == selected_block()?.id)
          if (this_block) { selected_block.set(this_block) }
        }
      })
  }
}

/**
* @description will create an ingredient block in MAIN_CHANNEL
* @returns {Promise<import("./lib/arena.js").Block>}
*/
const create_dish_block = async () => {
  let body = {
    content:
      `# recipe name
---

### ingredients


### instructions


`
  }
  let b;

  return await client
    .channel(MAIN_CHANNEL)
    .create_block(body)
    .then((block) => {
      b = block
      client.block(block.id).update({ title: "dish" })
    })
    .then((res) => {
      console.log(res)
      return b
    })

}

const create_ingredient_block = async (name) => {
  let body = {
    content: `# ${name}`
  }

  let b;

  return await client
    .channel(MAIN_CHANNEL)
    .create_block(body)
    .then((block) => {
      b = block
      client.block(block.id).update({ title: "ingredient" })
    })
    .then((res) => {
      console.log(res)
      return b
    })
}


const link_is_block = (link) => {
  return link.includes("are.na/block");
};

const extract_block_id = (link) => {
  return parseInt(link.split("/").pop());
};

const marks_contain_arena_block = (marks) => {
  let link = undefined
  let arena_block = undefined
  marks.forEach((e) => e.type.name == "link" ?
    link = e.attrs.href : null
  )

  if (link && link_is_block(link)) {
    let id = extract_block_id(link)
    arena_block = contents().find(b => b.id == id)
  }

  return arena_block ? arena_block : false
}

const process_ingredients = (block) => {

  if (!block) return
  if (block.class == "Text" && block.title == "ingredient") {
    let node = markdown.defaultMarkdownParser.parse(block.content)

    node.descendants((child) => {
      if (child.marks.length > 0) {
        let b = marks_contain_arena_block(child.marks)
        if (b) {
          if (child.text?.toLowerCase() == "image") {
            block.image = b.image
          }
        }
      }
    })
    return block
  }
}


const process_image_blocks = (block) => {
  if (!block) return
  if (block.class == "Image") { return block }
}

const fuzzy_match = (str, list) => {
  let is = false
  list.forEach((fuzz) => str.toLowerCase() == fuzz ?
    is = true : null
  )
  return is
}

const is_ingredients_fuzzy = (str) => {
  if (!str) return false
  let fuzzy = ["ingredients", "ingredeints"
    , "ingredient", "ingredeint"
    , "ingrideint", "ingrideints"
  ]
  return fuzzy_match(str, fuzzy)
}

const process_dishes = (block) => {
  if (!block) return
  if (block.class == "Text" && block.title == "dish") {
    let ingredients = []
    let instruction_ingredients = []
    let node = markdown.defaultMarkdownParser.parse(block.content)
    let in_ing = false
    let in_inst = false

    node.descendants((child) => {
      // -----------------
      // Mirror this live while editing dish
      // -----------------
      // To get curr ingredients
      // if instructions mentions and ingredients
      // that are not there in ingredients, 
      // prompt or automatically add it
      // -----------------
      if (in_inst
        && child.text
        && child.marks.length > 0
      ) {
        let block = marks_contain_arena_block(child.marks)
        if (block) instruction_ingredients.push({
          node: child,
          block
        })
      }

      if (child.text?.toLowerCase() == "instructions") {
        in_ing = false
        in_inst = true
      }

      if (in_ing
        && child.text
        && child.marks.length > 0
      ) {
        let block = marks_contain_arena_block(child.marks)
        if (block) ingredients.push(block)
      }

      if (is_ingredients_fuzzy(child.text)) {
        in_ing = true
        in_inst = false
      }

    })
    block.ingredients = ingredients
    return block
  }
}










































let client

// check if logged in

// fetch kitchen channel

// -----------------------------
// To do with authentication
// -----------------------------
// state
// initalize
// view
// -----------------------------


// ----------------------------
// Data flow
// ----------------------------
let auth = sig(localStorage.getItem("AUTH"))

//   --------
//   once authenticated
//.  logged_as is set
//       |
//       v

let logged_as = sig(false)
let unauthorized = sig(false)
//   --------
//   when set
//   get main channel
//       |
//       v
eff_on(logged_as, () => {
  if (logged_as() && client) {
    client.channel(MAIN_CHANNEL)
      .get()
      .then((res) => {
        if (res.slug) {
          console.log("got channel", res)
          libary_channel.set(res)
          channels.set([res])
        } else {
          // handle errors
          if (res.code == 401 || res.message == "Unauthorized") {
            unauthorized.set(true)
            console.log("seems like you aren't on the guest list")
          }
        }
      })
  }
})

// -------
//       |
//       once this gets set
//.      fetch channels
//       |
//       v
let libary_channel = sig(false)
//       |
//       v
eff_on(libary_channel, () => {
  if (client && libary_channel()) {
    libary_channel().contents?.forEach((channel) => {
      if (channel?.class == "Channel") {
        client.channel(channel.slug)
          .get()
          .then((c) => {
            channels.set([...channels(), c])
          })
      }
    })
  }
})

let channels = sig([])
let my_channel = mem(() => channels().find(c => c.user.slug == logged_as()))
let contents = mem(() => channels().map(c => c.contents).flat().filter(e => e != undefined))


let dishes = mem(() =>
  contents()
    .map(process_dishes)
    .filter(e => e != undefined))

let ingredients = mem(() =>
  contents()
    .map(process_ingredients)
    .filter(e => e != undefined))

let image_blocks = mem(() =>
  contents()
    .map(process_image_blocks)
    .filter(e => e != undefined))

let connections = mem(() => {
  let map = {}
  ingredients().forEach((b) => map[b.id] = [])
  dishes().forEach(dish => {
    dish.ingredients.forEach((block) => {
      if (map[block.id]) map[block.id].push(dish)
    })
  })
  // go through dishes, and pin to ingredients
  console.log("map", map)
  return map
})

let active_ingredients = mem(() => {
  let a = ingredients()?.filter((b) => selected_dish_has_me(b))
  console.log("active", a)
  if (a) return a
  else return []
})

let inactive_ingredients = mem(() => {
  let a = ingredients()?.filter((b) => !selected_dish_has_me(b))
  console.log("inactive", a)
  if (a) return a
  else return []
})

let selected_block = sig(null)
let current_text = sig("")
let editable = mem(() => (selected_block()?.user?.slug == logged_as() || !selected_block()))






























// ---------------
// ARENA SIDE
// ---------------

import { Arena } from "./lib/arena.js"
const MAIN_CHANNEL = "recipe-journals"

function arena() {
  // ----------------------------
  // Initialize Are.na
  // ----------------------------
  let init_arena = () => {
    // attempt auth
    client = Arena({ auth: auth() })
    client.me().then((res) => {
      if (res.slug) { logged_as.set(res.slug) }
    })
  }

  // -----------------------------
  // Login DOM
  // -----------------------------
  let login = () => {
    let input = sig("")
    let oninput = (e) => input.set(e.target.value)
    let save = () => {
      auth.set(input())
      localStorage.setItem("AUTH", auth())
      init_arena()
    }
    return html`
    h2 -- Login to Are.na pliss
    .text
      span -- To log in, get an auth code from 
      a [href=https://arena-token-gen.vercel.app/] -- this link 
      span -- and then enter it below.
    
    .login-panel
      input [type=text oninput=${oninput}] 
      button [onclick=${save}] -- save
    `
  }

  let logger = mem(() => {
    if (!auth()) {
      return login()
      console.log("no auth")
    }
    else if (unauthorized()) {
      return html`
        h2 -- seems like you aren't on the guest list
        p.text -- Ask Aaryan to add you as a collaborator. If you don't know who Aaryan is, I'm confused how you got here.
      `
    } else {
      init_arena()
      return html`span.auth -- ${logged_as}`
    }
  })

  let pencil_icon = () => {
    let elem = document.createElement("span")
    elem.innerHTML = pencil
    return elem
  }


  let ing_dom = (active) => (block) => {
    let editable = mem(() => {
      if (block.user?.slug == logged_as()) {
        return pencil_icon
      }
    })

    let s = mem(() => {
      return (selected_block()?.id == block.id)
    })

    let classes = mem(() => `block ingredient ${s() ? "selected" : ""} ${active ? "active" : ""}`)

    return html`
    div [
      class=${classes}
      onclick=${() => selected_block.set(block)}
      style=cursor:pointer ]
      p -- ${first_line(block.content)}
      span.bottom-right -- ${editable}
      
    `
  }

  let active_ing_dom = ing_dom(true)
  let inactive_ing_dom = ing_dom(false)



  let dish_dom = block => {
    let editable = mem(() => {
      if (block.user?.slug == logged_as()) {
        return pencil_icon
      }
    })

    let s = mem(() => selected_block()?.id == block.id)
    let classes = mem(() => `block dish ${s() ? "selected" : ""}`)

    return html`
    div [
      class=${classes}
      onclick=${() => selected_block.set(block)}
      style=cursor:pointer ]
      
      p -- ${first_line(block.content)}
      span.bottom-right -- ${editable}
    `
  }

  let carrier_bag = mem(() => {
    if (logged_as()) return html`
      h2 -- Dishes
      button [onclick=${add_dish}] -- Add
      .dishes-container
        each of ${dishes} as ${dish_dom}
        
      h2 -- Ingredients
      .ingredients-container
         each of ${active_ingredients} as ${active_ing_dom}
         each of ${inactive_ingredients} as ${inactive_ing_dom}
      .panel 
        input [id=new-ingredient]
        button [onclick=${() => add_ingredient(document.getElementById("new-ingredient")?.value)}] -- Add
      
    `
  })

  return html`
    .login -- ${logger}
    .bag -- ${carrier_bag}
  `
}





































function top_bar() {
  let unsaved = mem(() => current_text() != selected_block()?.content)
  return html`
   .top-bar
     .notify -- !()!
     .info -- [${() => unsaved() ? "unsaved" : "saved"}]
     .buttons -- (save)
  `
}




function insertText(text, from, to, state, dispatch) {
  dispatch(state.tr.insertText(text, from, to))
}

function setMarkLink(href, state, dispatch) {
  dispatch(
    state.tr.setStoredMarks([markdown.schema.mark(markdown.schema.marks.link, { href })])
  )
}

function autocomplete_search() {
  const filter = sig("")
  const action = sig("ingredients")
  const _show = sig(false)
  const x = sig(0)
  const y = sig(0)


  const filtered = mem(() =>
    action() == "ingredients"
      ? ingredients()
        .filter(e => {
          return first_line(e.content).toLowerCase()
            .includes(filter().toLowerCase())
        })
        .concat([{ content: "Add: " + filter() }])

      : image_blocks()
        .filter(e => {
          console.log("b", e)
          return first_line(e.title).toLowerCase()
            .includes(filter().toLowerCase())
        })
  )


  const cursor = sig(-1)
  eff_on(filter, () => cursor.set(-1))

  const cursor_next = () => {
    cursor() + 1 < filtered().length
      ? cursor.set(cursor() + 1)
      : null
  }

  const cursor_prev = () =>
    cursor() - 1 > -1
      ? cursor.set(cursor() - 1)
      : null

  const enter = (view, range) => {
    let current = filtered()[cursor()]
    if (!current) return
    console.log(current)

    if (current.content.includes("Add:")) {
      console.log("clicked add")
      let ingredient = view.state.doc.cut(range.from + 1, range.to).textContent.trim()
      if (ingredient) {
        add_ingredient(ingredient).then((block) => {
          if (!block) {
            console.log("Block nahi mila...")
            return
          }
          let link = "https://are.na/blocks/" + block.id
          setMarkLink(link, view.state, view.dispatch)

          // Todo: replace all #
          insertText(first_line(block.content).replace("#", "").trim(), range.from, range.to, view.state, view.dispatch)
        })
      }


      return true

    }

    else {
      // ----------------
      // add ingredient
      // ----------------
      let link = "https://are.na/blocks/" + current.id
      setMarkLink(link, view.state, view.dispatch)

      // Todo: replace all #
      if (action() == "ingredients") {
        insertText(first_line(current.content).replace("#", "").trim(), range.from, range.to, view.state, view.dispatch)
      }

      else {
        insertText("image", range.from, range.to, view.state, view.dispatch)
      }
    }
  }

  const w = 300
  const style = mem(() => `
    position: fixed;
    display: ${_show() ? "block" : "none"};
    width: ${w}px;
    height: 200px;
    top: ${y()}px;
    left: ${x() + w}px;
    background: white;
    border: 1px solid black;
    padding: .5em;
    z-index: 99;
    
  `
  )

  /**
  * @param {string} str
  */
  const set_filter = (str) => filter.set(str)

  /**
  * @param {{x: number, y: number}} pos
  */
  const set_position = (pos) => {
    if (pos.x) x.set(pos.x)
    if (pos.y) y.set(pos.y)
  }

  const line = (e) => action() == "ingredients"
    ? first_line(e.content).replace("#", " ")
    : e.title

  const img = (e) => e.image ? html`img.smol [src=${e.image.thumb.url}]` : ""

  const render = () => {
    return html`
      .ingredient-results [style=${style}]
        each of ${filtered} as ${(e, i) => html`
           div [class=${mem(() => `line ${i() == cursor() ? "selected-result" : ""}`)}]
            span -- ${img(e)}
            p  -- ${line(e)} 
        `}
    `
  }

  return {
    render,
    set_filter,
    set_position,
    cursor_next,
    cursor_prev,
    enter,

    reset: () => {
      filter.set("")
      cursor.set(-1)
    },

    action: (act) => action.set(act),

    hide: () => _show.set(false),
    show: () => _show.set(true),
    showing: _show
  }
}

function handle_ingredient_search(action) {
  console.log()
  let anchor = document.getElementById("ingredient-search")
  let floating = document.querySelector(".ingredient-results")

  if (action.kind == "open") {
    complete.action(action.type.name)
    compute_position(anchor, floating,
      {
        strategy: "fixed",
        placement: 'bottom-end',
      }
    ).then(({ x, y }) => {
      complete.set_position({ x, y })
    })

    complete.show()
    return true
  }

  if (action.kind == "close") {
    complete.reset()
    complete.hide()
    return true
  }

  if (action.kind == "filter") {
    complete.set_filter(action.filter)
    return true
  }

  if (action.kind == "enter") {
    complete.enter(action.view, action.range)
    complete.reset()
    complete.hide()
    return true
  }

  if (action.kind == "ArrowDown") {
    complete.cursor_next()
    return true
  }

  if (action.kind == "ArrowUp") {
    complete.cursor_prev()
    return true
  }

}

let complete = autocomplete_search()




































function Editor() {
  mounted(() => {
    let v = createEditor("")
    eff_on(selected_block, () => {
      if (selected_block()) {
        if (v) v.destroy()
        v = createEditor(selected_block().content, selected_block())
      }
    })
  })

  return html` #editor -- ${complete.render} `
}

// -------------------------
// Editor Creator
// -------------------------
function createEditor(text, block) {
  current_text.set(text)
  let auto = autocomplete.autocomplete

  const options = {
    reducer: handle_ingredient_search,
    triggers: [
      {
        name: 'images',
        trigger: '@',
        decorationAttrs: { id: 'ingredient-search' }
      },
      {
        name: 'ingredients',
        trigger: '/',
        decorationAttrs: { id: 'ingredient-search' }
      },
    ],
  };

  let v = new view.EditorView(document.querySelector("#editor"), {
    state: state.EditorState.create({
      doc: markdown.defaultMarkdownParser.parse(text),
      plugins: [
        ...auto(options),
        ...exampleSetup.exampleSetup({ schema: markdown.schema, menuBar: false }),
        keymap.keymap({
          "Mod-s": (state) =>
            save_block(
              markdown.defaultMarkdownSerializer.serialize(state.doc),
              block)
        })
      ]
    }),

    dispatchTransaction(transaction) {
      if (transaction.docChanged) {
        // -----------------
        // Todo: probably don't call every keystroke
        // ----------------
        let d = markdown.defaultMarkdownSerializer.serialize(transaction.doc)
        current_text.set(d)
      }

      let newState = v.state.apply(transaction)
      v.updateState(newState)
    },

    editable,
    nodeViews: {},
    markViews: {
      link(mark) {
        let dom = document.createElement("div")
        dom.style.display = "inline-block"
        let block = marks_contain_arena_block([mark])

        if (block) {
          dom.classList.add("block-link")
          dom.onclick = () => selected_block.set(block)

          if (block.image) {
            dom.style.backgroundImage = "url(" + block.image.thumb.url + ")"
          }
          else {
            dom.style.backgroundImage = "url(" + default_image + ")"
          }
        }

        return { dom }

      }
    }

  })
  return v
}














const Root = () => {
  return html`
  style -- ${style}
  .main
    .bar-container -- ${top_bar}
    .dual
      .editor-container -- ${Editor}
      .arena-container -- ${arena}
  `
}

render(Root, document.body)
































