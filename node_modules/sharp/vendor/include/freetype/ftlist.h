/***************************************************************************/
/*                                                                         */
/*  ftlist.h                                                               */
/*                                                                         */
/*    Generic list support for FreeType (specification).                   */
/*                                                                         */
/*  Copyright 1996-2018 by                                                 */
/*  David Turner, Robert Wilhelm, and Werner Lemberg.                      */
/*                                                                         */
/*  This file is part of the FreeType project, and may only be used,       */
/*  modified, and distributed under the terms of the FreeType project      */
/*  license, LICENSE.TXT.  By continuing to use, modify, or distribute     */
/*  this file you indicate that you have read the license and              */
/*  understand and accept it fully.                                        */
/*                                                                         */
/***************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /*  This file implements functions relative to list processing.  Its     */
  /*  data structures are defined in `freetype.h'.                         */
  /*                                                                       */
  /*************************************************************************/


#ifndef FTLIST_H_
#define FTLIST_H_


#include <ft2build.h>
#include FT_FREETYPE_H

#ifdef FREETYPE_H
#error "freetype.h of FreeType 1 has been loaded!"
#error "Please fix the directory search order for header files"
#error "so that freetype.h of FreeType 2 is found first."
#endif


FT_BEGIN_HEADER


  /*************************************************************************/
  /*                                                                       */
  /* <Section>                                                             */
  /*    list_processing                                                    */
  /*                                                                       */
  /* <Title>                                                               */
  /*    List Processing                                                    */
  /*                                                                       */
  /* <Abstract>                                                            */
  /*    Simple management of lists.                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    This section contains various definitions related to list          */
  /*    processing using doubly-linked nodes.                              */
  /*                                                                       */
  /* <Order>                                                               */
  /*    FT_List                                                            */
  /*    FT_ListNode                                                        */
  /*    FT_ListRec                                                         */
  /*    FT_ListNodeRec                                                     */
  /*                                                                       */
  /*    FT_List_Add                                                        */
  /*    FT_List_Insert                                                     */
  /*    FT_List_Find                                                       */
  /*    FT_List_Remove                                                     */
  /*    FT_List_Up                                                         */
  /*    FT_List_Iterate                                                    */
  /*    FT_List_Iterator                                                   */
  /*    FT_List_Finalize                                                   */
  /*    FT_List_Destructor                                                 */
  /*                                                                       */
  /*************************************************************************/


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_List_Find                                                       */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Find the list node for a given listed object.                      */
  /*                                                                       */
  /* <Input>                                                               */
  /*    list :: A pointer to the parent list.                              */
  /*    data :: The address of the listed object.                          */
  /*                                                                       */
  /* <Return>                                                              */
  /*    List node.  NULL if it wasn't found.                               */
  /*                                                                       */
  FT_EXPORT( FT_ListNode )
  FT_List_Find( FT_List  list,
                void*    data );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_List_Add                                                        */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Append an element to the end of a list.                            */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    list :: A pointer to the parent list.                              */
  /*    node :: The node to append.                                        */
  /*                                                                       */
  FT_EXPORT( void )
  FT_List_Add( FT_List      list,
               FT_ListNode  node );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_List_Insert                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Insert an element at the head of a list.                           */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    list :: A pointer to parent list.                                  */
  /*    node :: The node to insert.                                        */
  /*                                                                       */
  FT_EXPORT( void )
  FT_List_Insert( FT_List      list,
                  FT_ListNode  node );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_List_Remove                                                     */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Remove a node from a list.  This function doesn't check whether    */
  /*    the node is in the list!                                           */
  /*                                                                       */
  /* <Input>                                                               */
  /*    node :: The node to remove.                                        */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    list :: A pointer to the parent list.                              */
  /*                                                                       */
  FT_EXPORT( void )
  FT_List_Remove( FT_List      list,
                  FT_ListNode  node );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_List_Up                                                         */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Move a node to the head/top of a list.  Used to maintain LRU       */
  /*    lists.                                                             */
  /*                                                                       */
  /* <InOut>                                                               */
  /*    list :: A pointer to the parent list.                              */
  /*    node :: The node to move.                                          */
  /*                                                                       */
  FT_EXPORT( void )
  FT_List_Up( FT_List      list,
              FT_ListNode  node );


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_List_Iterator                                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    An FT_List iterator function that is called during a list parse    */
  /*    by @FT_List_Iterate.                                               */
  /*                                                                       */
  /* <Input>                                                               */
  /*    node :: The current iteration list node.                           */
  /*                                                                       */
  /*    user :: A typeless pointer passed to @FT_List_Iterate.             */
  /*            Can be used to point to the iteration's state.             */
  /*                                                                       */
  typedef FT_Error
  (*FT_List_Iterator)( FT_ListNode  node,
                       void*        user );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_List_Iterate                                                    */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Parse a list and calls a given iterator function on each element.  */
  /*    Note that parsing is stopped as soon as one of the iterator calls  */
  /*    returns a non-zero value.                                          */
  /*                                                                       */
  /* <Input>                                                               */
  /*    list     :: A handle to the list.                                  */
  /*    iterator :: An iterator function, called on each node of the list. */
  /*    user     :: A user-supplied field that is passed as the second     */
  /*                argument to the iterator.                              */
  /*                                                                       */
  /* <Return>                                                              */
  /*    The result (a FreeType error code) of the last iterator call.      */
  /*                                                                       */
  FT_EXPORT( FT_Error )
  FT_List_Iterate( FT_List           list,
                   FT_List_Iterator  iterator,
                   void*             user );


  /*************************************************************************/
  /*                                                                       */
  /* <FuncType>                                                            */
  /*    FT_List_Destructor                                                 */
  /*                                                                       */
  /* <Description>                                                         */
  /*    An @FT_List iterator function that is called during a list         */
  /*    finalization by @FT_List_Finalize to destroy all elements in a     */
  /*    given list.                                                        */
  /*                                                                       */
  /* <Input>                                                               */
  /*    system :: The current system object.                               */
  /*                                                                       */
  /*    data   :: The current object to destroy.                           */
  /*                                                                       */
  /*    user   :: A typeless pointer passed to @FT_List_Iterate.  It can   */
  /*              be used to point to the iteration's state.               */
  /*                                                                       */
  typedef void
  (*FT_List_Destructor)( FT_Memory  memory,
                         void*      data,
                         void*      user );


  /*************************************************************************/
  /*                                                                       */
  /* <Function>                                                            */
  /*    FT_List_Finalize                                                   */
  /*                                                                       */
  /* <Description>                                                         */
  /*    Destroy all elements in the list as well as the list itself.       */
  /*                                                                       */
  /* <Input>                                                               */
  /*    list    :: A handle to the list.                                   */
  /*                                                                       */
  /*    destroy :: A list destructor that will be applied to each element  */
  /*               of the list.  Set this to NULL if not needed.           */
  /*                                                                       */
  /*    memory  :: The current memory object that handles deallocation.    */
  /*                                                                       */
  /*    user    :: A user-supplied field that is passed as the last        */
  /*               argument to the destructor.                             */
  /*                                                                       */
  /* <Note>                                                                */
  /*    This function expects that all nodes added by @FT_List_Add or      */
  /*    @FT_List_Insert have been dynamically allocated.                   */
  /*                                                                       */
  FT_EXPORT( void )
  FT_List_Finalize( FT_List             list,
                    FT_List_Destructor  destroy,
                    FT_Memory           memory,
                    void*               user );

  /* */


FT_END_HEADER

#endif /* FTLIST_H_ */


/* END */
