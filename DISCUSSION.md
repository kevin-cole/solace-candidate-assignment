### Notes

I limited my work to about 2 hours and change, though I quite enjoyed it and did not want to stop

### Thoughts

- The magic search that is implemented here might be a bit confusing to a user. I feel it would make sense to pull out certain search fields (like location) into there own inputs. It also might make sense to add a detailed search component that separated out the fields to allow for more targeted searching
- Obviously searching on the server is more performant but, for this kind of search, even a filtered return could be quite large. The Server should page the results and the client updated to handle paged results

### Next Steps

- Better call out specialties that matched in "magic" search
- Add a better empty state when no records returned
- Add Error component that displays when there is a server response error (also could recede, be dismissed)
