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
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap');
@import url("https://use.typekit.net/vfz2iav.css");

@font-face {
  font-family: "velveyne";
  src: url("./font/Velvelyne-Regular.woff");
}

*::-webkit-scrollbar {
  display: none;
}

*{
  /*font-family: "JetBrains Mono", monospace;*/
  /*font-family: "platelet", sans-serif;*/
  /*font-family: "Roboto", sans-serif;*/
  font-family: "velveyne", sans-serif;

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

@keyframes shake {
  0% { transform: translate(1px, 1px) rotate(0deg); }
  10% { transform: translate(-1px, -2px) rotate(-1deg); }
  20% { transform: translate(-3px, 0px) rotate(1deg); }
  30% { transform: translate(3px, 2px) rotate(0deg); }
  40% { transform: translate(1px, -1px) rotate(1deg); }
  50% { transform: translate(-1px, 2px) rotate(-1deg); }
  60% { transform: translate(-3px, 1px) rotate(0deg); }
  70% { transform: translate(3px, 1px) rotate(-1deg); }
  80% { transform: translate(-1px, -1px) rotate(1deg); }
  90% { transform: translate(1px, 2px) rotate(0deg); }
  100% { transform: translate(1px, -2px) rotate(-1deg); }
}

.shaking {
  animation: shake 0.5s infinite;
}

.little {
  margin-top: -1em;
  opacity: .5;
  font-size: .7em;
}

input[type="text"], button{
  all: unset;
  background: white;
  border: 1px solid black;
  padding:.3em;
  margin: 0 .5em;
}

button {
  cursor: pointer;
}

button:hover {
  background: #eee;
}

#editor {
  position: relative;
}

.top-right {
  position: absolute;
  top: 1em;
  right: 1em;
  z-index: 99;
}

.disabled {
  opacity: .4;
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
  padding: 1em;
  display: flex;
  justify-content: space-between;
}

.main {
  display: grid;
  width: calc(100vw - 2em);
  margin: 0 auto;
  grid-template-rows: 8% 85%;
  padding: 1em;
  grid-gap: 1em;
  overflow: hidden;
  height: 100vh;
}

.dual {
  width: calc(100% - 2em);
  display: grid;
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

.editable {
  border: 2px dotted #ccc !important;
  box-shadow: 0 0 5px 2px #8881;
}

.editable:hover {
  transition: all 100ms;
  transform: scale(1.05);
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
}

.block:hover {
  background-color: #0002;
}

.ProseMirror {
  position: relative;
  padding: 2em;
}

.ProseMirror li {
  margin-left: 2.5em;
}

.ProseMirror img {
  max-width:90%;
  max-height:60vh;
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
  outline: none;
}

.ProseMirror-focused {
  background-color: #aaa1;
  border: 1px dotted #000b;
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





`)

let cached_style = localStorage.getItem("recipe-style")
if (cached_style) style.set(cached_style)

M.style = style













const first_line = (str) => str ? str.split(`\n`).shift() : "undefined"
const refresh = (slug) => client.channel(slug).hack_refresh()

const selected_ingredient_can_make = (block) => {
  if (selected_block()?.title == "ingredient") {
    if (connections()[selected_block().id].find((b) => b.id == block.id)) return true
  }
  else false
}

const selected_dish_has_me = (block) => {
  if (selected_block()?.title == "dish") {
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
  console.log("save called")
  if (block && MAIN_CHANNEL) {
    client.block(block.id).update({ content })
      .then(_ => refresh(MAIN_CHANNEL))
      .then(_ => client.block(block.id).get())
      .then(block => {
        console.log("updated", block)
        return block
      })
      .then(updated_block => {

        if (updated_block) {
          let channel_copy = channels()[0]
          let i = channel_copy.contents.findIndex((b) => b.id == updated_block.id)
          if (i != -1) { channel_copy.contents.splice(i, 1, updated_block) }
          channels.set([channel_copy])
        }

        if (selected_block()?.id == block.id) {
          let updated = contents()
          let this_block = updated.find((b) => b.id == selected_block()?.id)
          if (this_block) { selected_block.unsafe_set(this_block) }
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
  list.forEach((fuzz) => str.toLowerCase().includes(fuzz) ?
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
        let _block = marks_contain_arena_block(child.marks)
      }

      if (child.text?.toLowerCase() == "instructions") {
        in_ing = false
        in_inst = true
      }

      if (in_ing
        && child.text
        && child.marks.length > 0
      ) {
        let _block = marks_contain_arena_block(child.marks)
        if (_block) ingredients.push(_block)
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


let channels = sig([])
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
  return map
})

let active_dish = mem(() => {
  let a = dishes()?.filter((b) => selected_ingredient_can_make(b))
  return a ? a : []
})

let inactive_dish = mem(() => {
  let a = dishes()?.filter((b) => !selected_ingredient_can_make(b))
  return a ? a : []
})

let active_ingredients = mem(() => {
  let a = ingredients()?.filter((b) => selected_dish_has_me(b))
  console.log(a.map((e) => first_line(e.content)))
  return a ? a : []
})

let inactive_ingredients = mem(() => {
  let a = ingredients()?.filter((b) => !selected_dish_has_me(b))
  return a ? a : []
})

let compact = sig(false)

let selected_block = (function() {
  let inner = sig(null)
  function outer() { return inner() }

  outer.set = (block) => {
    if (unsaved()) shake.set(true)
    else inner.set(block)
  }

  outer.unsafe_set = (block) => {
    inner.set(block)
  }

  return outer
})()


let shake = sig(false)
let current_text = sig("")
let editable = mem(() => (selected_block()?.user?.slug == logged_as() || !selected_block()))
let unsaved = mem(() => (current_text() != selected_block()?.content) && selected_block())
eff_on(unsaved, () => {
  if (shake() && !unsaved()) shake.set(false)
})






























// ---------------
// ARENA SIDE
// ---------------

import { Arena } from "./lib/arena.js"
import * as ModelTypes from "./lib/prosemirror/dist/modules/prosemirror-model/dist/index.js"
import * as StateTypes from "./lib/prosemirror/dist/modules/prosemirror-state/dist/index.js"
import * as ViewTypes from "./lib/prosemirror/dist/modules/prosemirror-view/dist/index.js"
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

    let classes = mem(() => `block ingredient ${s() ? "selected" : ""} ${active ? "active" : ""} ${editable() ? "editable" : ""}`)

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


  let dish_dom = active => block => {
    let editable = mem(() => {
      if (block.user?.slug == logged_as()) {
        return pencil_icon
      } else return false
    })

    let s = mem(() => selected_block()?.id == block.id)
    let classes = mem(() => `block dish ${s() ? "selected" : ""} ${active ? "active" : ""} ${editable() ? "editable" : ""}`)

    return html`
    div [
      class=${classes}
      onclick=${() => selected_block.set(block)}
      style=cursor:pointer ]
      
      p -- ${first_line(block.content)}
      p
        span.little -- ${editable}
        span.little -- ${block.user.initials}
    `
  }

  let active_dish_dom = dish_dom(true)
  let inactive_dish_dom = dish_dom(false)


  let carrier_bag = mem(() => {
    if (logged_as()) return html`
      h2 -- Dishes
      button [onclick=${add_dish}] -- Add
      .dishes-container
         each of ${active_dish} as ${active_dish_dom}
         each of ${inactive_dish} as ${inactive_dish_dom}
        
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
  return html`
   .top-bar
     .notify -- !()!
     .settings
       button [onclick=${() => compact.set(!compact())}] -- compact
  `
}




function insertText(text, from, to, state, dispatch) {
  dispatch(state.tr.insertText(text, from, to))
}

/**
 * @param {number} from 
 * @param {ModelTypes.Node} node 
 * @param {StateTypes.EditorState} state 
 * */
function insertNode(from, node, state, dispatch) {
  dispatch(state.tr.insert(from, node))
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

  let view_ref
  let range_ref


  const filtered = mem(() => {
    if (action() == "ingredients") {
      return ingredients()
        .filter(e => {
          return first_line(e.content).toLowerCase()
            .includes(filter().toLowerCase())
        })
        .concat([{ content: "Add: " + filter() }])
    }

    if (action() == "images") {
      return image_blocks()
        .filter(e => {
          return first_line(e.title).toLowerCase()
            .includes(filter().toLowerCase())
        })
    }

    if (action() == "images-node") {
      return image_blocks()
        .filter(e => {
          return first_line(e.title).toLowerCase()
            .includes(filter().toLowerCase())
        })
    }

    if (action() == "command") {
      return [{ content: "image" }, { content: "image-node" }, { content: "ingredient" }]
        .filter(e => {
          console.log(e.content.includes(filter().toLowerCase()))
          return e.content.includes(filter().toLowerCase())
        })
    }
  }
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

  const enter = () => {
    let current = filtered()[cursor()]
    if (!current) return

    if (current.content.includes("Add:")) {
      let ingredient = view_ref.state.doc.cut(range_ref.from + 1, range_ref.to).textContent.trim()
      if (ingredient) {
        add_ingredient(ingredient).then((block) => {
          if (!block) {
            return
          }

          let link = "https://are.na/blocks/" + block.id
          setMarkLink(link, view_ref.state, view_ref.dispatch)

          // Todo: replace all #
          insertText(first_line(block.content).replace("#", "").trim(), range_ref.from, range_ref.to, view_ref.state, view_ref.dispatch)
        })
      }


      return true

    }

    else {
      // ----------------
      // add ingredient
      // ----------------
      let link = "https://are.na/blocks/" + current.id
      setMarkLink(link, view_ref.state, view_ref.dispatch)

      // Todo: replace all #
      if (action() == "ingredients") {
        insertText(first_line(current.content).replace("#", "").trim(), range_ref.from, range_ref.to, view_ref.state, view_ref.dispatch)
      }

      else if (action() == "images-node") {
        //try to get current.id img
        let img_block = contents().find((e) => e.id == current.id)
        if (!img_block) return false

        let image = img_block.image
        console.log(image)

        if (image) link = image.display.url

        insertText("", range_ref.from, range_ref.to, view_ref.state, view_ref.dispatch)
        insertNode(range_ref.from, markdown.schema.node("image", { src: link }), view_ref.state, view_ref.dispatch)

      }

      else if (action() == "command") {
        if (current.content == "image-node") {
          setTimeout(() => insertText("img:", range_ref.from, range_ref.to, view_ref.state, view_ref.dispatch), 100)
          return true
        }
      }

      else {
        insertText("image", range_ref.from, range_ref.to, view_ref.state, view_ref.dispatch)
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
    overflow-y: scroll;
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

  const line = (e) => action().includes("images")
    ? e.title
    : first_line(e.content).replace("#", " ")

  const img = (e) => e.image ? html`img.smol [src=${e.image.thumb.url}]` : ""

  const render = () => {
    // scroll into view
    eff_on(cursor, () => {
      let current = document.querySelector("#ingredient-" + cursor())
      if (current) { current.scrollIntoView() }
    })

    return html`
      .ingredient-results [style=${style}]
        each of ${filtered} as ${(e, i) => html`
           div [
             id=${mem(() => "ingredient-" + i())}
             onclick=${() => {
          cursor.set(i());
          enter()
        }}
             class=${mem(() => `line ${i() == cursor() ? "selected-result" : ""}`)}
             style=cursor:pointer;
           ]
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

    update_ref: (view, range) => {
      view_ref = view
      range_ref = range
    },

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
  let anchor = document.getElementById("ingredient-search")
  let floating = document.querySelector(".ingredient-results")

  if (action.kind == "open") {
    complete.update_ref(action.view, action.range)
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
    // complete.view_ref(action.view)
    // complete.range_ref(action.view)
    return true
  }

  if (action.kind == "close") {
    complete.reset()
    complete.hide()
    return true
  }

  if (action.kind == "filter") {
    complete.update_ref(action.view, action.range)
    complete.set_filter(action.filter)
    return true
  }

  if (action.kind == "enter") {
    complete.update_ref(action.view, action.range)
    complete.enter()
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

  return html` 
  #editor 
    div -- ${complete.render} 
    button [ class=${() => "top-right " + (shake() ? "shaking" : "") + (unsaved() ? "" : "disabled")}
             onclick=${() => save_block(current_text(), selected_block())} 
           ] -- ${mem(() => unsaved() ? "save" : "[saved]")} 
  `
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
        name: 'command',
        trigger: 'cmd:',
        decorationAttrs: { id: 'ingredient-search' }
      },
      {
        name: 'images-node',
        trigger: 'img:',
        decorationAttrs: { id: 'ingredient-search' }
      },
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
          "Mod-s": (state) => {
            save_block(
              markdown.defaultMarkdownSerializer.serialize(state.doc),
              block
            )

            return true
          }
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

  setTimeout(() => document.querySelector(".ProseMirror").addEventListener("blur", () => {
    if (unsaved() && !complete.showing()) save_block(save_block(current_text(), selected_block()))
    if (complete.showing()) {
      setTimeout(() => complete.showing.set(false), 500)
    }
  }), 100)
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
































